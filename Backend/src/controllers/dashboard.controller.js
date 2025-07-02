const dashboardService = require('../services/dashboard.service');

async function getDashboard(req, res, next) {
  try {
    const userId = req.user.id; // preenchido pelo verifyJWT
    const data = await dashboardService.getDashboardData(userId);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getDashboard };
