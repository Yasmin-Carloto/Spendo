const db = require('../database/models/index');
const { User } = db;  // IMPORTANTE: aqui User, não Usuario

const create = async function(user) {
    const userCreated = await User.create(user);
    return userCreated;
};

const atualizar = async function(dados, id) {
    return await User.update(dados, { where: { id } });
};

const encontrarTodos = async function() {
    const users = await User.findAll();
    return users;
};

const encontrarPorId = async function(id) {
    const user = await User.findByPk(id);
    return user;
};

const encontrarPorWhere = async function(where) {
    const user = await User.findOne({ where });
    return user;
};

module.exports = {
    create,
    atualizar,
    encontrarTodos,
    encontrarPorId,
    encontrarPorWhere,
};
