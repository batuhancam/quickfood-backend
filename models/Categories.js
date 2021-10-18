const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    CategoryName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Categories', categorySchema)