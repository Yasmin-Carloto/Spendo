const { body, param } = require('express-validator')
const { validatorMessage } = require('../utils/errorMessage')

function create() {
  return [
    body('title', validatorMessage('Title')).exists().bail().isString(),
    body('begindate', validatorMessage('Begin Date')).exists().bail().isISO8601(),
    body('finaldate', validatorMessage('Final Date')).exists().bail().isISO8601(),
    body('moneytocollect', validatorMessage('Money to collect')).exists().bail().isDecimal(),
    body('moneycollected').optional().isDecimal(),
  ]
}

function update() {
  return [
    param('id', validatorMessage('Id')).exists().bail().isInt(),
    body('title').optional().isString(),
    body('begindate').optional().isISO8601(),
    body('finaldate').optional().isISO8601(),
    body('moneytocollect').optional().isDecimal(),
    body('moneycollected').optional().isDecimal(),
  ]
}

function remove() {
  return [
    param('id', validatorMessage('Id')).exists().bail().isInt(),
  ]
}

module.exports = {
  create,
  update,
  remove,
}
