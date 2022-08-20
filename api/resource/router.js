// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

router.get('/', (req, res, next) => {
  try {
    Resource.getResources().then((result) => {
      res.status(200).json(result)
    })
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    if (!req.body.resource_name) {
      next({ status: 400, message: "must provide a resource_name" })
      return;
    }

    const allResources = await Resource.getResources()
    const matchedResource = allResources.filter(resource => {
      return resource.resource_name === req.body.resource_name
    })
    if (matchedResource.length) {
      next({ status: 400, message: "resource_name must be unique" })
      return;
    }
    const result = await Resource.createResource(req.body)
    console.log(result)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

module.exports = router
