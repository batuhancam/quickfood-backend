const mongoose = require('mongoose')

const foodScheme = mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    foodStatus: {
        type: Number,
        required: true
    },
    foodActivity: {
        type: Boolean,
        required: true
    },
    foodPicturePaths: {
        type: Array,
        required: true
    },
    categoryID: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Foods', foodScheme)