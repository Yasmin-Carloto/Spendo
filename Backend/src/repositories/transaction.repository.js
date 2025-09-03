const db = require('../database/models')
const { Transaction } = db

async function create(data) {
  return await Transaction.create(data)
}

async function update(data, id, userId) {
  return await Transaction.update(data, { where: { id, userId } })
}

async function remove(id, userId) {
  return await Transaction.destroy({ where: { id, userId } })
}

async function findByUserId(userId) {
  return await Transaction.findAll({ where: { userId } })
}

async function findByType(type, userId) {
  return await Transaction.findAll({ where: { type, userId } })
}

async function findByCategory(categoryId, userId) {
  return await Transaction.findAll({ where: { categoryId, userId } })
}

async function findByIdAndUserId(id, userId) {
  return await Transaction.findOne({ where: { id, userId } })
}

async function updateByGroupId(groupId, data, userId) {
  return await Transaction.update(data, {
    where: { groupId, userId }
  })
}

async function findByGroupId(groupId, userId) {
  return await Transaction.findAll({
    where: { groupId, userId },
    order: [['installmentNumber', 'ASC']]
  })
}

async function removeByGroupId(groupId, userId) {
  return await Transaction.destroy({
    where: { groupId, userId }
  })
}

module.exports = {
  create,
  update,
  remove,
  findByUserId,
  findByType,
  findByCategory,
  findByIdAndUserId,
  updateByGroupId,
  findByGroupId,
  removeByGroupId
}
