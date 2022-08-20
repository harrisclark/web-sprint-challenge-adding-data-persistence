// build your `/api/tasks` router here
const router = require('express').Router();
const Task = require('./model');

router.get('/', (req, res, next) => {
  try {
    Task.getTasks()
      .then(result => {
        res.status(200).json(
          result.map((task) => ({
            ...task,
            task_completed: !!task.task_completed,
          }))
          )
      })
  } catch (err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.task_description) {
      next({ status: 400, message: "task_description required"})
      return;
    }

    const result = await Task.createTask(req.body)
    const formatResult = {
      ...result,
      task_completed: !!result.task_completed
    }
    res.status(201).json(formatResult)
    // Task.createTask(req.body)
    //   .then(result => {
    //     res.status(201).json({...result, task_completed: !!result.task_completed})
    //   })
  } catch (err) {
    next(err)
  }
});

module.exports = router;