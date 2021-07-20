const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  id: String,
  sport_key: String,
  commence_time: Date,
  home_team: String,
  away_team: String,
  bookmakers: [
    {
      key: String,
      title: String,
      last_update: Date,
      markets: [
        {
          key: String,
          outcomes: [
            {
              name: String,
              price: Number,
              point: Number,
            },
          ],
        },
      ],
    },
  ],
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
