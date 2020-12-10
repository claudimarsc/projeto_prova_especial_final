const mongoose = require('mongoose')

// definição do esquema
/**
 * - id (gerado pela persistência)
- userId (UUID)
- conteudo (texto)
- foto (texto, url)
- status (criado, publicado)
- dataDeCriacao (data-hora)
- dataDeModificacao (data-hora)
 */
const postSchema = new mongoose.Schema({
    userId : {
        type: String,
        required: true
    },
    conteudo : {
        type: String,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    dataDeCriacao: {
        type: Date,
        required: true,
        default: Date.now
    },
    dataDeModificacao: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// configurando o esquema no banco
module.exports = mongoose.model('Post', postSchema)