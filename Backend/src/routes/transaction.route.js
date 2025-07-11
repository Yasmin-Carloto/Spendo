const express = require('express')
const router = express.Router()
const verifyJWT = require('../middlewares/authorizator')
const transactionController = require('../controllers/transaction.controller')
const transactionValidator = require('../validators/transaction.validator')

router.get('/', verifyJWT, transactionController.findAllByUser)
router.get('/type/:type', transactionValidator.findByType(), verifyJWT, transactionController.findByType)
router.get('/category/:categoryId', transactionValidator.findByCategory(), verifyJWT, transactionController.findByCategory)
router.post('/', transactionValidator.create(), verifyJWT, transactionController.create)
router.put('/:id', transactionValidator.update(), verifyJWT, transactionController.update)
router.delete('/:id', transactionValidator.remove(), verifyJWT, transactionController.remove)

module.exports = router
