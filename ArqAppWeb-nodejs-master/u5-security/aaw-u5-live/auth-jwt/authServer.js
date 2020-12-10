require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

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
app.post('/login', (req, res) => {
    // autenticação

    const username = req.body.username
    const user = { name: username}

    const accessToken = generateAccessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    refreshTokens.push(refreshToken)

    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '45s'})
}

app.listen(4000)