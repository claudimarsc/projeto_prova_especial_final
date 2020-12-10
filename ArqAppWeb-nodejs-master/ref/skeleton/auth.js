require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')
const user = require('./models/user')

const router = express.Router()

const app = express()

app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('error', (error) => console.log(error))

db.once('open', () => console.log('Connected to Mongo DB'))


const User = require('./models/user')

let refreshTokens = []

// refresh do token
app.post('/token', (req, res) => {
    const refreshToken = req.body.token

    console.log('401')
    if (refreshToken == null) return res.sendStatus(401)

    console.log('403')
    if (!refreshTokens.includes(refreshToken))
        return res.sendStatus(403)

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        console.log('403b')
        if (err) return res.sendStatus(403)

        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken: accessToken})
    })

})

// exclui o token
app.delete('/logout', (req, res) => {
    const refreshToken = req.body.refreshToken
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)

    res.sendStatus(204);
})

// cria o token
app.post('/login', getUser, (req, res) => {
    // autenticação
    console.log('teste')
//    const username = req.body.username
//    const pw = req.body.pw
    const user = res.user

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '120s'})
}

async function getUser(req, res, next) {
    try {
        const name = req.body.name
        const user = await User.findOne({'name': name})

        if (user == null) {
            return res.status(404).json({message: 'User not found'})
        }

        if (user.pw != req.body.pw) {
            return res.status(404).json({message: 'User not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.user = {username: req.body.name}

    next()
}


app.listen(4000)