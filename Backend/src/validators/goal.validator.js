const { body, param } = require('express-validator')
const { validatorMessage } = require('../utils/errorMessage')

function create() {
  return [
    body('title', validatorMessage('Title')).exists().bail().isString(),
    body('beginDate', validatorMessage('Begin Date')).exists().bail().isISO8601(),
    body('finalDate', validatorMessage('Final Date')).exists().bail().isISO8601(),
    body('moneyToCollect', validatorMessage('Money to collect')).exists().bail().isDecimal(),
    body('moneyCollected').optional().isDecimal(),
  ]
}

function update() {
  return [
    param('id', validatorMessage('Id')).exists().bail().isInt(),
    body('title').optional().isString(),
    body('beginDate').optional().isISO8601(),
    body('finalDate').optional().isISO8601(),
    body('moneyToCollect').optional().isDecimal(),
    body('moneyCollected').optional().isDecimal(),
  ]
}

function remove() {
  return [
    param('id', validatorMessage('Id')).exists().bail().isInt(),
  ]
}

function findById() {
  return [
    param('id', validatorMessage('Id')).exists().bail().isInt(),
  ]
}


module.exports = {
  create,
  update,
  remove,
  findById,
}
