const express = require('express');
const Favorites = require('../models/Favorites');
const router = express.Router();
// Last Error Code 5

// GET ALL Favorites
router.get('/', async(req, res) => {
    try {
        const favorites = await Favorites.find();
        res.json(favorites)
    } catch (err) {
        res.json({ message: 'Favorites not found!', errorCode: 3001 })
    }
});

// ADD A Favorites BELONG A User
router.post('/add', async(req, res) => {
    const favorites = new Favorites({
        userID: req.body.userID,
        foodID: req.body.foodID
    })

    try {
        const saveFavorite = await favorites.save()
        res.json(saveFavorite)
    } catch (err) {
        res.json({ message: err, errorCode: 3004 })
    }
});

// GET FAVORITES OF A USER
router.post('/getByUserID', async(req, res) => {
    try {
        const favorites = await Favorites.find({ userID: req.body.userID })
        if (favorites) {
            res.json(favorites)
        } else {
            res.json({ message: 'User doesn\'t have any favorite', errorCode: 3002 })
        }
    } catch (err) {
        res.json({ message: 'Favorutes not found!', errorCode: 3003 })
    }
});

// IS USER LIKE THE FOOD
router.post('/isLiked', async(req, res) => {
    try {
        const favorites = await Favorites.find();
        console.log(req.body)
        favorites.forEach((fav) => {
            if (fav.userID == req.body.userID && fav.foodID == req.body.foodID) {

                res.json({ status: true })
            }
        })
    } catch (err) {
        res.json({ message: 'Favorutes not found!', errorCode: 3005, status: false })
    }
})

module.exports = router