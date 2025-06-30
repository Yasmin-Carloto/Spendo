const userRepository = require('../repositories/user.repository');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');

const create = async function(user) {
  const existingUser = await userRepository.encontrarPorWhere({ email: user.email });

  if (existingUser) {
    throw createError(409, 'User already exists');
  }

  user.password = await bcrypt.hash(user.password, parseInt(process.env.SALT));
  const createdUser = await userRepository.create(user);

  // remover password do retorno
  const userJson = createdUser.toJSON();
  delete userJson.password;

  return userJson;
};

const login = async function(user) {
  const userLogin = await userRepository.encontrarPorWhere({ email: user.email });

  if (!userLogin) {
    throw createError(401, 'Invalid user!');
  }

  const passwordMatch = await bcrypt.compare(user.password, userLogin.password);

  if (!passwordMatch) {
    throw createError(401, 'Invalid user!');
  }

  const token = sign(
    { id: userLogin.id },
    process.env.SECRET,
    { expiresIn: '1h' }
  );

  const userJson = userLogin.toJSON();
  delete userJson.password;

  return {
    auth: true,
    user: userJson,
    token,
  };
};

const encontrarTodos = async function() {
  return await userRepository.encontrarTodos();
};

const encontrarPorId = async function(id) {
  const user = await userRepository.encontrarPorId(id);

  if (!user) {
    throw createError(404, 'User not found');
  }

  return user;
};

module.exports = {
  create,
  encontrarTodos,
  encontrarPorId,
  login,
};
