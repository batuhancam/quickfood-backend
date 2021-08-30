const mongoose = require('mongoose')

const ingredientSchema = mongoose.Schema({
    ingredientName: {
        type: String,
        required: true
    },
    foodID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Ingredients', ingredientSchema)