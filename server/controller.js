const isBefore = require('date-fns/isBefore');
const isWithinInterval = require('date-fns/isWithinInterval');
const formatISO = require('date-fns/formatISO');
const parseISO = require('date-fns/parseISO');

const getOddsData = require('../apiHelpers/theOdds');
const Game = require('../database/models/Game');
const schedule = require('./schedule');

const controller = {
  refresh: async (req, res) => {
    try {
      const response = await getOddsData();

      const { data } = response;

      console.log('data', data);

      await Promise.all(data.map(async (gameObj) => {
        const currentGame = new Game(gameObj);
        await currentGame.save();
        console.log('saved game', currentGame.home_team);
      }));

      res.status(200).send(response.data);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getAll: async (req, res) => {
    const data = await Game.find({});

    // console.log(data);
    console.log('array length', data.length);

    res.status(200).send(data);
  },

  getCurrentWeek: async (req, res) => {
    const currentDate = new Date();
    const seasonStart = schedule[1].start;

    let currentWeek;

    if (isBefore(currentDate, seasonStart)) {
      currentWeek = 1;
    } else {
      for (const [key, value] of Object.entries(schedule)) {
        const inRange = isWithinInterval(currentDate, {
          start: value.start,
          end: value.end
        });

        if (inRange) {
          currentWeek = Number(key);
          break;
        }
      }
    }

    const data = await Game.find({
      commence_time: {
        $gte: formatISO(schedule[currentWeek].start),
        $lte: formatISO(schedule[currentWeek].end)
      }
    });

    const sortedData = {
      tnf: [],
      sat: [],
      morning: [],
      afternoon: [],
      evening: [],
      pt: []
    };

    data.forEach((gameObj) => {
      const localDate = parseISO(gameObj.commence_time.toISOString());
      const dayIndex = localDate.getDay();
      // [Sunday, Monday, Tuesday, Wed, Thurs, Fri, Sat]

      if (dayIndex === 4) {
        sortedData.tnf.push(gameObj);
      } else if (dayIndex === 6) {
        sortedData.sat.push(gameObj);
      } else if (dayIndex === 1) {
        sortedData.pt.push(gameObj);
      } else {
        const utcHour = Number(gameObj.commence_time.toISOString().split('T')[1].slice(0, 2));

        if (utcHour >= 0 && utcHour <= 4) {
          // Primetime slate
          // 8 PM EST = 12 AM UTC
          // 12 AM EST = 4 AM UTC
          sortedData.pt.push(gameObj);
        } else if (utcHour < 17) {
          // early morning games / London
          // 1 PM EST = 5 PM UTC
          sortedData.morning.push(gameObj);
        } else if (utcHour < 20) {
          // 1 PM games
          // 4 PM EST = 8 PM UTC
          sortedData.afternoon.push(gameObj);
        } else {
          // 4 PM games
          sortedData.evening.push(gameObj);
        }
      }
    });

    // res.status(200).send(data);
    res.status(200).send(sortedData);
  }
};

module.exports = controller;
