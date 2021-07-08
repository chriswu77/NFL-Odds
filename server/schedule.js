const addWeeks = require('date-fns/addWeeks');

const weeks = {};
const initialWeek = new Date(2021, 8, 7); // Sept 7, 2021
let lastWeek = initialWeek;

for (let i = 0; i < 18; i++) {
  const weekNum = i + 1;

  weeks[weekNum] = {
    start: lastWeek,
    end: addWeeks(lastWeek, 1)
  }

  lastWeek = addWeeks(lastWeek, 1);
}

module.exports = weeks;