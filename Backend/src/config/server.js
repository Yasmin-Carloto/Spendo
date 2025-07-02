require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const handle404Error = require('../middlewares/handle404Error');
const handleError = require('../middlewares/handleError');

const userRoute = require('../routes/user.route');
const dashboardRoute = require('../routes/dashboard.route'); 

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// Rotas
server.use('/api/users', userRoute);
server.use('/api/dashboard', dashboardRoute); 

// Middleware de erro
server.use(handle404Error);
server.use(handleError);

server.listen(process.env.PORTA, () => {
  console.log(`BACKEND rodando na porta ${process.env.PORTA}...`);
});

module.exports = server;
