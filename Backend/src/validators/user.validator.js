const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const create = function (){
    return [
        body('name', validatorMessage('Name')).exists().bail().isString(),
        body('email', validatorMessage('Email')).exists().bail().isEmail(),
        body('password', validatorMessage('Password')).exists().bail().isString().isLength({ min: 6 }),
    ];
};

const encontrarPorId = function() {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
    ];
};

const login = function (){
    return [
        body('email', validatorMessage('Email')).exists().bail().isEmail(),
        body('password', validatorMessage('Password')).exists().bail().isString(),
    ];
};

module.exports = {
    create,
    encontrarPorId,
    login,
};
