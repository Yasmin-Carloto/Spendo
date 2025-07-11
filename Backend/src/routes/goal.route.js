const express = require('express')
const router = express.Router()
const controller = require('../controllers/goal.controller')
const validator = require('../validators/goal.validator')
const verifyJWT = require('../middlewares/authorizator')

router.get('/', verifyJWT, controller.findAllByUser)
router.post('/', validator.create(), verifyJWT, controller.create)
router.put('/:id', validator.update(), verifyJWT, controller.update)
router.delete('/:id', validator.remove(), verifyJWT, controller.remove)

module.exports = router