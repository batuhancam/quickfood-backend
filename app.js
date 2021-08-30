const express = require('express');
const mongoose = require('mongoose');
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
app.use(express.json())
app.use('/users', usersRoute)
app.use('/foods', foodsRoute)





// Listen this ports
app.listen(3000)