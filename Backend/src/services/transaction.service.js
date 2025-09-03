const transactionRepository = require('../repositories/transaction.repository')
const transactionGroupRepository = require('../repositories/transactionGroup.repository')
const categoryRepository = require('../repositories/category.repository')
const createError = require('http-errors')

async function create(data, userId) {
  const category = await categoryRepository.findByIdAndUserId(data.categoryId, userId)
  if (!category) {
    throw createError(404, 'Category not found for this user')
  }

  // Caso sem parcelas
  const installments = data.installments ?? 1
  if (installments <= 1) {
    return await transactionRepository.create({
      ...data,
      totalValue: data.value,
      startDate: data.date,
      userId,
    })
  } 

  // Caso com parcelas
  const group = await transactionGroupRepository.create({
    ...data,
    totalValue: data.value,
    startDate: data.date,
    userId,
  })

  const transactions = []
  const baseDate = new Date(data.date)
  const installmentValue = data.value / installments

  for (let installment = 0; installment < installments; installment++) {
    const installmentDate = new Date(baseDate)
    installmentDate.setMonth(baseDate.getMonth() + installment)

    const transactionData = {
      ...data,
      userId,
      value: installmentValue,
      installmentNumber: installment + 1,
      date: installmentDate,
      groupId: group.id,
      totalValue: data.value,
    }

    await transactionRepository.create(transactionData)
    transactions.push(transactionData)
  }

  return transactions
}

async function update(id, data, userId) {
  const existing = await transactionRepository.findByIdAndUserId(id, userId)
  if (!existing) throw createError(404, 'Transaction not found')

  if (existing.groupId) {
    const transactions = await transactionRepository.findByGroupId(existing.groupId, userId)
    const baseDate = data.date ? new Date(data.date) : new Date(transactions[0].date)

    const totalValue = data.value
      ? Number(data.value)
      : transactions.reduce((sum, transaction) => sum + Number(transaction.value), 0)

    const installmentValue = totalValue / transactions.length

    const updatedTransactions = []
    for (let i = 0; i < transactions.length; i++) {
      const transactionDate = new Date(baseDate)
      transactionDate.setMonth(baseDate.getMonth() + i)

      const transactionData = {
        ...data,
        value: installmentValue,
        date: transactionDate,
      }

      const updated = await transactionRepository.update(transactionData, transactions[i].id, userId)
      updatedTransactions.push(updated)
    }

    await transactionGroupRepository.update(existing.groupId, { totalValue }, userId)

    return { transactions: updatedTransactions, totalValue }
  } else {
    const result = await transactionRepository.update(data, id, userId)
    if (result[0] === 0) {
      throw createError(400, 'Update failed')
    } else {
      const transaction = await transactionRepository.findByIdAndUserId(id, userId)
      return transaction
    }
  }
}

async function remove(id, userId) {
  const existing = await transactionRepository.findByIdAndUserId(id, userId)
  if (!existing) throw createError(404, 'Transaction not found')

  if (existing.groupId) {
    const result = await transactionRepository.removeByGroupId(existing.groupId, userId)
    if (result === 0) {
      throw createError(400, 'Delete failed')
    }

    await transactionGroupRepository.remove(existing.groupId, userId)
  } else {
    const result = await transactionRepository.remove(id, userId)
    if (result === 0) {
      throw createError(400, 'Delete failed')
    }
    return result
  }
}

async function findAllByUser(userId) {
  return await transactionRepository.findByUserId(userId)
}

async function findByType(type, userId) {
  return await transactionRepository.findByType(type, userId)
}

async function findByCategory(categoryId, userId) {
  return await transactionRepository.findByCategory(categoryId, userId)
}

async function findById(id, userId) {
  const transaction = await transactionRepository.findByIdAndUserId(id, userId)
  if (!transaction) throw createError(404, 'Transaction not found')
  console.log(transaction)

  if (transaction.groupId) {
    const group = await transactionGroupRepository.findById(transaction.groupId, userId)
    return {
      categoryId: transaction.categoryId,
      date: group.startDate,
      groupId: transaction.groupId,
      id: transaction.id,
      installmentNumber: transaction.installmentNumber,
      installments: transaction.installments,
      title: transaction.title,
      type: transaction.expense,
      userId: transaction.userId,
      totalValue: group.totalValue,
      type: transaction.type,
    }
  }

  return transaction
}

module.exports = {
  create,
  update,
  remove,
  findAllByUser,
  findByType,
  findByCategory,
  findById,
}
