const express = require('express')
const router = express.Router()
const verifyJWT = require('../middlewares/authorizator')
const transactionController = require('../controllers/transaction.controller')
const transactionValidator = require('../validators/transaction.validator')

router.get('/', verifyJWT.verifyJWT, transactionController.findAllByUser)
router.get('/type/:type', transactionValidator.findByType(), verifyJWT.verifyJWT, transactionController.findByType)
router.get('/category/:categoryId', transactionValidator.findByCategory(), verifyJWT.verifyJWT, transactionController.findByCategory)
router.get('/:id',  transactionValidator.findById(), verifyJWT.verifyJWT, transactionController.findById)
router.post('/', transactionValidator.create(), verifyJWT.verifyJWT, transactionController.create)
router.put('/:id', transactionValidator.update(), verifyJWT.verifyJWT, transactionController.update)
router.delete('/:id', transactionValidator.remove(), verifyJWT.verifyJWT, transactionController.remove)

module.exports = router
