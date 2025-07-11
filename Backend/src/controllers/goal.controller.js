const goalService = require('../services/goal.service')
const { validationResult } = require('express-validator')
const createError = require('http-errors')

async function create(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() })

    const goal = await goalService.create(req.body, req.user.id)
    res.status(201).send(goal)
  } catch (err) {
    next(err)
  }
}

async function update(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() })

    const updatedGoal = await goalService.update(req.params.id, req.body, req.user.id)
    res.send({ message: 'Goal updated successfully', goal: updatedGoal })
  } catch (err) {
    next(err)
  }
}

async function remove(req, res, next) {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) throw createError(422, { errors: errors.array() })

    await goalService.remove(req.params.id, req.user.id)
    res.send({ message: 'Goal deleted successfully' })
  } catch (err) {
    next(err)
  }
}

async function findAllByUser(req, res, next) {
  try {
    const goals = await goalService.findAllByUser(req.user.id)
    res.send(goals)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  create,
  update,
  remove,
  findAllByUser,
}
