const express = require('express');
const router = express.Router();

const { getDashboard } = require('../controllers/dashboard.controller');
const verifyJWT = require('../middlewares/authorizator');

router.get('/', verifyJWT, getDashboard);

module.exports = router;
