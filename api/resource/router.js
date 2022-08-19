// build your `/api/resources` router here
const router = require('express').Router();
const Resource = require('./model');

router.get('/', (req, res, next) => {
  next()
});
router.post('/', (req, res, next) => {
  next()
});

module.exports = router;