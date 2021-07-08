const axios = require('axios');
const apiKey = require('../apiKey');

const sportKey = 'americanfootball_nfl';
const regions = 'us';
const markets = 'h2h,spreads,totals';
const oddsFormat = 'american';

const getOddsData = async () => {
  try {
    const response = await axios.get(`https://api.the-odds-api.com/v4/sports/${sportKey}/odds`, {
      params: {
        apiKey,
        regions,
        markets,
        oddsFormat
      }
    });

    console.log('Remaining requests',response.headers['x-requests-remaining']);

    console.log('Used requests',response.headers['x-requests-used']);

    return response;
  } catch (err) {
    console.log(err);
    return err;
  }
};

module.exports = getOddsData;