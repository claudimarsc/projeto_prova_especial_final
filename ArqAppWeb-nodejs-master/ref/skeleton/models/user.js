const mongoose = require('mongoose')

// definição do esquema
const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    pw: {
        type: String,
        required: true
    },
    criadoEm: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// configurando o esquema no banco
module.exports = mongoose.model('User', userSchema)