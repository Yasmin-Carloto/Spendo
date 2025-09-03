const express = require('express')
const router = express.Router()
const verifyJWT = require('../middlewares/authorizator')
const userController = require('../controllers/user.controller')
const userValidator = require('../validators/user.validator')

router.post('/', userValidator.create(), userController.create)
router.post('/login', userValidator.login(), userController.login)
router.post('/forgot-password', userValidator.forgotPassword(), userController.forgotPassword)
router.put('/recover-password', userValidator.updatePassword(), verifyJWT.verifyJWTTemporarily, userController.updatePassword)
router.get('/me', verifyJWT.verifyJWT, userController.getUserInfo)
router.put('/me', verifyJWT.verifyJWT, userValidator.update(), userController.update)

module.exports = router