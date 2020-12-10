const express = require('express')

const router = express.Router()

const Noticias = require('../models/noticias')

// GET all
router.get('/', async (req, res) => {
    try {
        const noticias = await Noticias.find()

        return res.send(noticias)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// GET by ID
router.get('/:id', getNoticias, async (req, res) => {

    res.json(res.noticias)
})

// POST create
router.post('/', async (req, res) => {

    const noticias = new Noticias({

        titulo: req.body.titulo,
        descricao: req.body.descricao,
        idEscritor: req.body.idEscritor,
        foto: req.body.foto,
        dataDeCriacao: req.body.dataDeCriacao,
        dataDeModificacao: req.body.dataDeModificacao,

    })

    try {
        const created = await noticias.save()

        res.status(201).json(created)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// PATCH update
router.patch('/:id', getNoticias, async (req, res) => {
    if (req.body.titulo != null) {
        res.user.titulo = req.body.titulo
    }

    if (req.body.descricao != null) {
        res.user.descricao = req.body.descricao
    }
    if (req.body.idEscritor != null) {
        res.user.idEscritor = req.body.idEscritor
    }

    if (req.body.foto != null) {
        res.user.foto = req.body.foto
    }

    if (req.body.dataDeCriacao != null) {
        res.user.dataDeCriacao = req.body.dataDeCriacao
    }

    if (req.body.dataDeModificacao != null) {
        res.user.dataDeModificacao = req.body.dataDeModificacao
    }
    try {
        const updated = await res.noticias.save()

        res.json(updated)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// DELETE remove
router.delete('/:id', getNoticias, async (req, res) => {

    try {
        await res.noticias.remove()

        res.json({ message: 'Deleted Successfully' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// middleware
async function getNoticias(req, res, next) {
    try {
        noticias = await Noticias.findById(req.params.id)

        if (noticias == null) {
            return res.status(404).json({ message: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.noticias = noticias

    next()
}

// export
module.exports = router