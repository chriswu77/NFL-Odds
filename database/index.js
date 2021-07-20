const mongoose = require('mongoose');

const mongoURI = 'mongodb://localhost:27017/nflodds';

const db = mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.then((database) => console.log(`Connected to: ${mongoURI}`)).catch((err) => {
  console.log(`There was a problem connecting to mongo at: ${mongoURI}`);
  console.log(err);
});

module.exports = db;
