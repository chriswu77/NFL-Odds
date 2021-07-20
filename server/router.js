const router = require('express').Router();
const controller = require('./controller');

router.get('/refresh', controller.refresh);

router.get('/all', controller.getAll);

router.get('/week', controller.getCurrentWeek);

router.get('/games/:week?', controller.getGames);

module.exports = router;
