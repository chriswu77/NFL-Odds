const router = require('express').Router();
const controller = require('./controller');

router.get('/refresh', controller.refresh);

router.get('/getAll', controller.getAll);

router.get('/getCurrentWeek', controller.getCurrentWeek);

module.exports = router;
