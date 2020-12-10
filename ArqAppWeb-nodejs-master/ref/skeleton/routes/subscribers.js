const express = require('express')

const router = express.Router()

const Subscriber = require('../models/subscriber')

const jwt = require('jsonwebtoken')

// GET all
router.get('/', authenticateToken, async (req, res) => {
    try {
        const subscribers = await Subscriber.find()

        return res.send(subscribers)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', authenticateToken, getSubscriber, async (req, res) => {

    res.json(res.subscriber)
})

// POST create
router.post('/', authenticateToken, async (req, res) => {

    const subscriber = new Subscriber({
        name: req.body.name,
        channel: req.body.channel
    })

    try {
        const created = await subscriber.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('/:id', authenticateToken, getSubscriber, async (req, res) => {
    if (req.body.name != null) {
        res.subscriber.name = req.body.name
    }

    if (req.body.channel != null) {
        res.subscriber.channel = req.body.channel
    }

    try {
        const updated = await res.subscriber.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE remove
router.delete('/:id', authenticateToken, getSubscriber, async (req, res) => {

    try {
        await res.subscriber.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getSubscriber(req, res, next) {
    try {
        subscriber = await Subscriber.findById(req.params.id)

        if (subscriber == null) {
            return res.status(404).json({message: 'Subscriber not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.subscriber = subscriber

    next()
}

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

// export
module.exports = router