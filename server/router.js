const router = require('express').Router();
const controller = require('./controller');

router.get('/refresh', controller.refresh);

router.get('/all', controller.getAll);

router.get('/current', controller.getCurrentWeek);

router.get('/summary', controller.getSummary);

module.exports = router;
