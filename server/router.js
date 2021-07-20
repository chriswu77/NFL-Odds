const router = require('express').Router();
const controller = require('./controller');

router.get('/refresh', controller.refresh);

router.get('/current', controller.getCurrentWeek);

router.get('/summary', controller.getGames);

module.exports = router;
