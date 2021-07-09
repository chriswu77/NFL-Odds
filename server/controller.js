const getOddsData = require('../apiHelpers/theOdds');
const Game = require('../database/models/Game');
const helpers = require('./helpers');

const controller = {
  refresh: async (req, res) => {
    try {
      const response = await getOddsData();

      const { data } = response;

      await Promise.all(data.map(async (gameObj) => {
        const currentGame = new Game(gameObj);
        await currentGame.save();
        // console.log('saved game', currentGame.home_team);
      }));

      res.status(200).send('data successfully refreshed');
    } catch (err) {
      res.status(400).send(err);
    }
  },

  getAll: async (req, res) => {
    const data = await Game.find({});

    res.status(200).send(data);
  },

  getCurrentWeek: (req, res) => {
    const currentWeek = helpers.findCurrentWeek();

    res.status(200).json(currentWeek);
  },

  getSummary: async (req, res) => {
    const data = await helpers.summarizeGames();

    res.status(200).send(data);
  }
};

module.exports = controller;
