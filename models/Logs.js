const mongoose = require('mongoose')

const logSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    foodID: {
        type: String,
        required: true,
    },
    logDescription: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Logs', logSchema)