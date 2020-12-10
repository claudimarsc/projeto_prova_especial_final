// configurar variáveis de ambiente
require('dotenv').config()

// configurar o express
const express = require('express')

const app = express()

// logging
const morgan = require('morgan')
app.use(morgan(':method :url: :status :res[content-length] - :response-time ms'))

// monitoramento
app.use(require('express-status-monitor')())

// configurar acesso a banco mongodb
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.log(error))

db.once('open', () => console.log('Connected to Mongo DB'))

app.use(express.json())

const subscribersRouter = require('./routes/subscribers')
app.use('/v1/subscribers', subscribersRouter)


app.listen(3000, () => console.log('Server started.'))