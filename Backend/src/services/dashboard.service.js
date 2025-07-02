const transactionRepository = require('../repositories/transaction.repository');
const goalRepository = require('../repositories/goal.repository');

async function getDashboardData(userId) {
  const totalEntradas = await transactionRepository.getTotalByType(userId, 'entrada');
  const totalSaidas = await transactionRepository.getTotalByType(userId, 'saida');
  const saldo = totalEntradas - totalSaidas;
  const metas = await goalRepository.getGoalsWithProgress(userId);
  
  return {
    totalEntradas,
    totalSaidas,
    saldo,
    metas,
  };
}

module.exports = { getDashboardData };
