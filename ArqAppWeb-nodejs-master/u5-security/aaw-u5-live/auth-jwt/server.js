require('dotenv').config()

const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

// recursos que serão protegidos
const posts = [
    {
        name: 'josé',
        titulo: 'test 1'
    },
    {
        name: 'joão',
        titulo: 'test2'
    }
]

app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts)
})

app.get('/health', (req, res) => {
    res.json({'msg': 'hello'})
})

function authenticateToken(req, res, next) {
    // HTTP Header
    // authorization
    // Bearer <token>
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log('Error: ' + err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })

}

app.listen(3000)