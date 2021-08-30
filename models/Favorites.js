const mongoose = require('mongoose')

const favoriteScheme = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    foodID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Favorites', favoriteScheme)