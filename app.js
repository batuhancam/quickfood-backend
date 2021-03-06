const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
const app = express();


mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.once('open', () => {
    console.log('connected')
})

//Import Routes
const usersRoute = require('./routes/users')
const foodsRoute = require('./routes/foods')
const favoritesRoute = require('./routes/favorites')
const categoriesRoute = require('./routes/categories')
const ingredientsRoute = require('./routes/ingredients')
app.use(cors())
app.use(express.json())
app.use('/users', usersRoute)
app.use('/foods', foodsRoute)
app.use('/favorites', favoritesRoute)
app.use('/categories', categoriesRoute)
app.use('/ingredients', ingredientsRoute)
// Listen this ports
app.listen(3000)