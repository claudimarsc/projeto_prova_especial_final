const mongoose = require('mongoose')

// definição do esquema
const noticiasSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    idEscritor: {
        type: UUID,
        required: true
    },
    foto: {
        type: String,
        required: true
    },
    dataDeCriacao: {
        type: Date,
        required: true
    },
    dataDeModificacao: {
        type: Date,
        required: true
    }

})

// configurando o esquema no banco
module.exports = mongoose.model('Noticias', noticiasSchema)