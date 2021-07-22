const isBefore = require('date-fns/isBefore');
const isWithinInterval = require('date-fns/isWithinInterval');
const formatISO = require('date-fns/formatISO');
const parseISO = require('date-fns/parseISO');

const getOddsData = require('../apiHelpers/theOdds');
const Game = require('../database/models/Game');
const schedule = require('./schedule');

const refreshData = async () => {
  // remove all documents in Game collection first
  await Game.deleteMany({});

  const response = await getOddsData();
  const { data } = response;

  await Promise.all(
    data.map(async (gameObj) => {
      const currentGame = new Game(gameObj);
      await currentGame.save();
    })
  );

  const requestInfo = {
    remaining: response.headers['x-requests-remaining'],
    used: response.headers['x-requests-used'],
  };

  return requestInfo;
};

const findCurrentWeek = () => {
  const currentDate = new Date();
  const seasonStart = schedule[1].start;

  let currentWeek;

  if (isBefore(currentDate, seasonStart)) {
    currentWeek = 1;
  } else {
    for (const [key, value] of Object.entries(schedule)) {
      const inRange = isWithinInterval(currentDate, {
        start: value.start,
        end: value.end,
      });

      if (inRange) {
        currentWeek = Number(key);
        break;
      }
    }
  }

  return currentWeek;
};

const filterWeekGames = async (week) => {
  const filteredData = await Game.find({
    commence_time: {
      $gte: formatISO(schedule[week].start),
      $lte: formatISO(schedule[week].end),
    },
  });

  return filteredData;
};

const sortIntoSlates = (weekGames) => {
  const sortedGames = {
    tnf: [],
    sat: [],
    morning: [],
    afternoon: [],
    evening: [],
    pt: [],
  };

  weekGames.forEach((gameObj) => {
    const localDate = parseISO(gameObj.commence_time.toISOString());
    const dayIndex = localDate.getDay();
    // [Sunday, Monday, Tuesday, Wed, Thurs, Fri, Sat]

    if (dayIndex === 4) {
      sortedGames.tnf.push(gameObj);
    } else if (dayIndex === 6) {
      sortedGames.sat.push(gameObj);
    } else if (dayIndex === 1) {
      sortedGames.pt.push(gameObj);
    } else {
      const utcHour = Number(
        gameObj.commence_time.toISOString().split('T')[1].slice(0, 2)
      );

      if (utcHour >= 0 && utcHour <= 4) {
        // Primetime slate
        // 8 PM EST = 12 AM UTC
        // 12 AM EST = 4 AM UTC
        sortedGames.pt.push(gameObj);
      } else if (utcHour < 17) {
        // early morning games / London
        // 1 PM EST = 5 PM UTC
        sortedGames.morning.push(gameObj);
      } else if (utcHour < 20) {
        // 1 PM games
        // 4 PM EST = 8 PM UTC
        sortedGames.afternoon.push(gameObj);
      } else {
        // 4 PM games
        sortedGames.evening.push(gameObj);
      }
    }
  });

  return sortedGames;
};

const sortCb = (a, b) => a - b;

const calcMedian = (sortedArr) => {
  const midpointIndex = Math.floor((sortedArr.length - 1) / 2);

  if (sortedArr.length % 2 === 0) {
    return (sortedArr[midpointIndex] + sortedArr[midpointIndex + 1]) / 2;
  }

  return sortedArr[midpointIndex];
};

const roundDecimal = (num) => Math.round(num * 10) / 10;

const getStats = (arr) => {
  if (arr.length === 0) {
    return null;
  }

  const sortedArr = arr.sort(sortCb);

  const avg = roundDecimal(
    sortedArr.reduce((sum, cur) => sum + cur) / sortedArr.length
  );
  const min = roundDecimal(sortedArr[0]);
  const max = roundDecimal(sortedArr[arr.length - 1]);
  const median = roundDecimal(calcMedian(sortedArr));

  return {
    avg,
    min,
    max,
    median,
  };
};

const summarizeGames = (sortedGames) => {
  const summarizedGames = sortedGames;

  for (const [slate, gamesArr] of Object.entries(sortedGames)) {
    if (gamesArr.length === 0) {
      continue;
    }

    const flattenedArr = gamesArr.map((gameObj) => {
      const newGameObj = {
        id: gameObj.id,
        commence_time: gameObj.commence_time,
        home_team: gameObj.home_team,
        away_team: gameObj.away_team,
      };

      const homeStats = {
        moneyLines: [],
        spreads: [],
        totals: [],
      };

      const awayStats = {
        moneyLines: [],
        spreads: [],
      };

      gameObj.bookmakers.forEach((bookie) => {
        if (bookie.key !== 'betfair') {
          bookie.markets.forEach((market) => {
            if (market.key === 'h2h') {
              market.outcomes.forEach((outcome) => {
                if (outcome.name === gameObj.home_team) {
                  homeStats.moneyLines.push(outcome.price);
                } else {
                  awayStats.moneyLines.push(outcome.price);
                }
              });
            } else if (market.key === 'spreads') {
              market.outcomes.forEach((outcome) => {
                if (outcome.name === gameObj.home_team) {
                  homeStats.spreads.push(outcome.point);
                } else {
                  awayStats.spreads.push(outcome.point);
                }
              });
            } else if (market.key === 'totals') {
              homeStats.totals.push(market.outcomes[0].point);
            }
          });
        }
      });

      const homeMoneyStats = getStats(homeStats.moneyLines);
      const homeSpreadStats = getStats(homeStats.spreads);
      const homeTotalStats = getStats(homeStats.totals);

      const awayMoneyStats = getStats(awayStats.moneyLines);
      const awaySpreadStats = getStats(awayStats.spreads);

      newGameObj.homeStats = {
        money_line: homeMoneyStats,
        spread: homeSpreadStats,
        over_under: homeTotalStats,
      };

      newGameObj.awayStats = {
        money_line: awayMoneyStats,
        spread: awaySpreadStats,
        over_under: homeTotalStats,
      };

      return newGameObj;
    });

    summarizedGames[slate] = flattenedArr;
  }

  return summarizedGames;
};

module.exports = {
  refreshData,
  findCurrentWeek,
  filterWeekGames,
  sortIntoSlates,
  summarizeGames,
};
