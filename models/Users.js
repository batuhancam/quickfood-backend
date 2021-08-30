const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userFullName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userStatus: {
        type: Number,
        required: true
    },
    userActivity: {
        type: Boolean,
        required: true
    },
    userCreatedDate: {
        type: Date,
        required: true,
        default: Date.now
    },

})

module.exports = mongoose.model('Users', userSchema)