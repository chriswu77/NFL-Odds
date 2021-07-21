const {
  refreshData,
  findCurrentWeek,
  filterWeekGames,
  sortIntoSlates,
  summarizeGames,
} = require('./helpers');
const Game = require('../database/models/Game');

const controller = {
  refresh: async (req, res) => {
    try {
      const resData = await refreshData();
      res.status(200).send(resData);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getAll: async (req, res) => {
    const data = await Game.find({});
    res.status(200).send(data);
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

      res.status(200).send(summarizedGames);
    } catch (err) {
      res.status(400).send(err);
    }
  },
};

module.exports = controller;
