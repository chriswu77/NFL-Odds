const router = require('express').Router();
const controller = require('./controller');

router.get('/games', controller.getAll);

router.get('/games/refresh', controller.refresh);

router.get('/games/:week?', controller.getGames);

router.get('/weeks/current', controller.getCurrentWeek);

module.exports = router;
