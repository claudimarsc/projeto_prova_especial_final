const express = require('express')

const router = express.Router()

const Subscriber = require('../models/subscriber')

// GET all
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()

        return res.send(subscribers)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', getSubscriber, async (req, res) => {

    res.json(res.subscriber)
})

// POST create
router.post('/', async (req, res) => {

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
router.patch('/:id', getSubscriber, async (req, res) => {
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
router.delete('/:id', getSubscriber, async (req, res) => {

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

// export
module.exports = router