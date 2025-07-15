require('dotenv').config()

// Requerindo bibliotecas
const express = require('express')
const bodyParser = require('body-parser')

// Requerindo middlewares de erro
const handle404Error = require('../middlewares/handle404Error')
const handleError = require('../middlewares/handleError')

const { userRoute, categoryRoute, transactionRoute, goalRoute } = require("../routes/index")

const server = express()

const cors = require('cors')
server.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', "DELETE", "PATCH"],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

server.options('/{*any}', cors()) 

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

// Rotas
server.use('/api/users', userRoute)
server.use("/api/categories", categoryRoute)
server.use("/api/transactions", transactionRoute)
server.use("/api/goals", goalRoute)

// Middleware de erro
server.use(handle404Error);
server.use(handleError);

server.listen(process.env.API_PORT, () => {
  console.log(`BACKEND rodando na porta ${process.env.API_PORT}...`)
})

module.exports = server
