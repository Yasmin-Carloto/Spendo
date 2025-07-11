const db = require('../database/models')
const { Goal } = db

async function create(data) {
  await Goal.create(data)
}

async function update(data, id, userId) {
  await Goal.update(data, { where: { id, userId } })
}

async function remove(id, userId) {
  await Goal.destroy({ where: { id, userId } })
}

async function findByUserId(userId) {
  await Goal.findAll({ where: { userId } })
}

async function findByIdAndUserId(id, userId) {
  await Goal.findOne({ where: { id, userId } })
}

module.exports = {
  create,
  update,
  remove,
  findByUserId,
  findByIdAndUserId,
}