const {
  refreshData,
  findCurrentWeek,
  filterWeekGames,
  sortIntoSlates,
  summarizeGames,
  sortByDate,
} = require('./helpers');

const controller = {
  refresh: async (req, res) => {
    try {
      const resData = await refreshData();
      res.status(200).send(resData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getCurrentWeek: (req, res) => {
    try {
      const currentWeek = findCurrentWeek();
      res.status(200).json(currentWeek);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getGames: async (req, res) => {
    try {
      let { week } = req.params;

      if (!week) {
        week = findCurrentWeek();
      }

      const weekGames = await filterWeekGames(week);
      const sortedBySlateGames = sortIntoSlates(weekGames);
      const summarizedGames = summarizeGames(sortedBySlateGames);
      const sortedByDateGames = sortByDate(summarizedGames);

      res.status(200).send(sortedByDateGames);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

module.exports = controller;
