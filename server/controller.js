const isBefore = require('date-fns/isBefore');
const isWithinInterval = require('date-fns/isWithinInterval');
const formatISO = require('date-fns/formatISO');
const parseISO = require('date-fns/parseISO');

const getOddsData = require('../apiHelpers/theOdds');
const Game = require('../database/models/Game');
const schedule = require('./schedule');
const helpers = require('./helpers');

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

    res.status(200).send(data);
  },

  getCurrentWeek: async (req, res) => {
    const data = await helpers.sortIntoSlates();

    res.status(200).send(data);
  }
};

module.exports = controller;
