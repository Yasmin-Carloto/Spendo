const goalRepository = require('../repositories/goal.repository')
const createError = require('http-errors')

const create = async (data, userId) => {
  return await goalRepository.create({ ...data, userId })
}

const update = async (id, data, userId) => {
  const existing = await goalRepository.findByIdAndUserId(id, userId)
  if (!existing) throw createError(404, 'Goal not found')

  const result = await goalRepository.update(data, id, userId)
  if (result[0] === 0) throw createError(400, 'Update failed')

  const updated = await goalRepository.findByIdAndUserId(id, userId)
  return updated
}

const remove = async (id, userId) => {
  const existing = await goalRepository.findByIdAndUserId(id, userId)
  if (!existing) throw createError(404, 'Goal not found')

  const result = await goalRepository.remove(id, userId);
  if (result === 0) throw createError(400, 'Delete failed')
}

const findAllByUser = async (userId) => {
  return await goalRepository.findByUserId(userId)
}

const findById = async (id, userId) => {
  const goal = await goalRepository.findByIdAndUserId(id, userId)
  if (!goal) throw createError(404, 'Goal not found')
  return goal
}


module.exports = {
  create,
  update,
  remove,
  findAllByUser,
  findById,
}
