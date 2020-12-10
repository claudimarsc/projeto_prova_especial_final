const express = require('express')

const router = express.Router()

const Post = require('../models/post')

// GET all
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()

        return res.send(posts)
    }catch (err) {
        res.status(500).json({message: err.message})
    }
})

// GET by ID
router.get('/:id', getPostsByUserId, getPost, async (req, res) => {

    res.json(res.post)
})

// POST create
router.post('/', async (req, res) => {

    const post = new Post({
        userId: req.body.userId,
        conteudo: req.body.conteudo,
        foto: req.body.foto,
        status: 'criado'
    })

    try {
        const created = await post.save()

        res.status(201).json(created)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

// PATCH update
router.patch('/:id', getPost, async (req, res) => {
    if (req.body.UserId != null) {
        res.post.userId = req.body.userId
    }

    if (req.body.conteudo != null) {
        res.post.conteudo = req.body.conteudo
    }

    if (req.body.foto != null) {
        res.post.foto = req.body.foto
    }

    if (req.body.status != null) {
        res.post.status = req.body.status
    }

    res.post.dataDeModificacao = new Date()

    try {
        const updated = await res.post.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})

router.put('/:id/publicar', getPost, async (req, res) => {

    res.post.status = 'publicado'
    res.post.dataDeModificacao = new Date()

    try {
        const updated = await res.post.save()

        res.json(updated)
    }catch (err) {
        res.status(400).json({message: err.message})
    }
})


// DELETE remove
router.delete('/:id', getPost, async (req, res) => {

    try {
        await res.post.remove()

        res.json({message: 'Deleted Successfully'}).status(204)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// middleware
async function getPost(req, res, next) {
    try {
        post = await Post.findById(req.params.id)

        if (post == null) {
            return res.status(404).json({message: 'Post not found'})
        }
    }catch (err) {
        res.status(500).json({message: err.message})
    }

    res.post = post

    next()
}

async function getPostsByUserId(req, res, next) {
    console.log('param: ' + req.params.id)
    try {

        if (req.params.id == 'search') {
            // https://mongoosejs.com/docs/api.html#model_Model.find
            posts = await Post.find({userId: req.query.userId}).exec()

            return res.json(posts)
        }

    }catch (err) {
        res.status(500).json({message: err.message})
    }

    next()
}

// export
module.exports = router