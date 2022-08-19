// build your `/api/projects` router here
const router = require('express').Router();
const Project = require('./model');

router.get('/', (req, res, next) => {
  next()
});
router.post('/', (req, res, next) => {
  next()
});

module.exports = router;