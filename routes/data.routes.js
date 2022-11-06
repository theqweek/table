const Router = require('express')
const dataController = require('../controller/data.controller')
const router = new Router()

router.get('/data', dataController.getData)
router.post('/data', dataController.createData)


module.exports = router