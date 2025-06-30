const userService = require('../services/user.service'); // Corrigido o nome
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const create = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() });
        }

        const response = await userService.create(req.body);
        if (response && response.message) {
            throw response;
        }
        res.send(response);
    } catch (error) {
        return next(error);
    }
};

const login = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() });
        }

        const response = await userService.login(req.body);
        if (response && response.message) {
            throw response;
        }
        res.send(response);
    } catch (error) {
        return next(error);
    }
};

const encontrarTodos = async function(req, res, next) {
    try {
        const response = await userService.encontrarTodos();
        res.send(response);
    } catch (error) {
        next(error);
    }
};

const encontrarPorId = async function(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw createError(422, { errors: errors.array() });
        }

        const response = await userService.encontrarPorId(req.params.id);

        if (response && response.message) {
            throw response;
        }

        res.send(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    create,
    encontrarTodos,
    encontrarPorId,
    login,
};
