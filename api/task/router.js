// build your `/api/tasks` router here
const router = require('express').Router();
const Task = require('./model');

router.get('/', (req, res, next) => {
  next()
});

router.post('/', (req, res, next) => {
  next()
});

module.exports = router;