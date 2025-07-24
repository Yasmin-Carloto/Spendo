const db = require('../database/models')
const { Goal } = db

async function create(data) {
  return await Goal.create(data)
}

async function update(data, id, userId) {
  return await Goal.update(data, { where: { id, userId } })
}

async function remove(id, userId) {
  return await Goal.destroy({ where: { id, userId } })
}

async function findByUserId(userId) {
  return await Goal.findAll({ where: { userId } })
}

async function findByIdAndUserId(id, userId) {
  return await Goal.findOne({ where: { id, userId } })
}

module.exports = {
  create,
  update,
  remove,
  findByUserId,
  findByIdAndUserId,
}