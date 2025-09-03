const express = require('express')
const router = express.Router()
const verifyJWT = require('../middlewares/authorizator')
const categoryController = require('../controllers/category.controller')
const categoryValidator = require('../validators/category.validator')

router.get('/', verifyJWT.verifyJWT, categoryController.findAllByUser)
router.get('/:id', verifyJWT.verifyJWT, categoryValidator.findById(), categoryController.findById)
router.post('/', verifyJWT.verifyJWT, categoryValidator.create(), categoryController.create)
router.put('/:id', verifyJWT.verifyJWT, categoryValidator.update(), categoryController.update)
router.delete('/:id', verifyJWT.verifyJWT, categoryValidator.remove(), categoryController.remove)

module.exports = router
