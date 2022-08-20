// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

router.get('/', (req, res, next) => {
  try {
    Project.getProjects().then((result) => {
      res.status(200).json(
        result.map((project) => ({
          ...project,
          project_completed: !!project.project_completed,
        }))
      )
    })
  } catch (err) {
    next(err)
  }
})
router.post('/', (req, res, next) => {
  try {
    if (!req.body.project_name) {
      next({ status: 400, message: 'must include a project_name' })
      return
    }

    Project.createProject(req.body).then((result) => {
      res
        .status(201)
        .json({ ...result, project_completed: !!result.project_completed })
    })
  } catch (err) {
    next(err)
  }
})

module.exports = router
