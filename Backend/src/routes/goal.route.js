const express = require('express')
const router = express.Router()
const controller = require('../controllers/goal.controller')
const validator = require('../validators/goal.validator')
const verifyJWT = require('../middlewares/authorizator')

router.get('/', verifyJWT.verifyJWT, controller.findAllByUser)
router.post('/', validator.create(), verifyJWT.verifyJWT, controller.create)
router.put('/:id', validator.update(), verifyJWT.verifyJWT, controller.update)
router.delete('/:id', validator.remove(), verifyJWT.verifyJWT, controller.remove)
router.get('/:id', validator.findById(), verifyJWT.verifyJWT, controller.findById)

module.exports = router