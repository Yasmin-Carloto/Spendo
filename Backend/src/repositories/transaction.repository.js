const models = require('../database/models');
console.log('Models disponíveis:', Object.keys(models));

const { Transaction } = models;
console.log('Transaction está:', Transaction);


async function getTotalByType(userId, tipo) {
  const result = await Transaction.sum('value', {
    where: {
      userId,
      type: tipo,
    },
  });

  return result || 0;
}

module.exports = { getTotalByType };
