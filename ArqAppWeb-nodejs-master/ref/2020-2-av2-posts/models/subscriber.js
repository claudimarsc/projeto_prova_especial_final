const mongoose = require('mongoose')

// definição do esquema
const subscriberSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    subscribedDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

// configurando o esquema no banco
module.exports = mongoose.model('Subscriber', subscriberSchema)