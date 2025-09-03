const db = require('../database/models')
const { TransactionGroup } = db

async function create(data) {
  return await TransactionGroup.create(data)
}

async function findById(id) {
  return await TransactionGroup.findByPk(id)
}

async function update(groupId, data, userId) {
  return await TransactionGroup.update(data, {
    where: { id: groupId, userId }
  })
}

async function findById(groupId, userId) {
  return await TransactionGroup.findOne({
    where: { id: groupId, userId }
  })
}

async function findByUserId(userId) {
  return await TransactionGroup.findAll({
    where: { userId },
    include: ['transactions']
  })
}

async function remove(id, userId) {
  return await TransactionGroup.destroy({
    where: { id, userId }
  })
}

module.exports = {
  create,
  findById,
  findByUserId,
  remove,
  update,
}
