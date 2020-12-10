const express = require('express')

const router = express.Router()

const User = require('../models/user')

// GET all
router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        return res.send(users)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', getUser, async (req, res) => {

    res.json(res.user)
})

// POST create
router.post('/', async (req, res) => {

    const user = new User({
        name: req.body.name,
        pw: req.body.pw
    })

    try {
        const created = await user.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    if (req.body.pw != null) {
        res.user.pw = req.body.pw
    }

    try {
        const updated = await res.user.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// DELETE remove
router.delete('/:id', getUser, async (req, res) => {

    try {
        await res.user.remove()

        res.json({message: 'Deleted Successfully'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getUser(req, res, next) {
    try {
        user = await User.findById(req.params.id)

        if (user == null) {
            return res.status(404).json({message: 'User not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.user = user

    next()
}

// export
module.exports = router