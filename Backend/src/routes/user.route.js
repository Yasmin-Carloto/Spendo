const express = require('express');
const router = express.Router();
const verifyJWT = require('../middlewares/authorizator');
const userController = require('../controllers/user.controller')
const userValidator = require('../validators/user.validator')

router.post('/', userValidator.create(), userController.create);
router.post('/login', userValidator.login(), userController.login);
router.get('/', verifyJWT, userController.encontrarTodos);
router.get('/:id', verifyJWT, userValidator.encontrarPorId(), userController.encontrarPorId);

module.exports = router;