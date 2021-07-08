const express = require('express');
const cors = require('cors');
const path = require('path');
const router = require('./router');
const db = require('../database/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', router);

module.exports = app;
