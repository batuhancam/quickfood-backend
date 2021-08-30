const express = require('express')
const Foods = require('../models/Foods')
const router = express.Router()
    // GET ALL FOODS
router.get('/', async(req, res) => {
    try {
        const foods = await Foods.find();
        res.json(foods)
    } catch (err) {
        res.json({ message: err })
    }
});
// ADD A FOOD
router.post('/add', async(req, res) => {

    const foods = new Foods({
        foodName: req.body.foodName,
        foodDescription: req.body.foodDescription,
        foodStatus: req.body.foodStatus,
        foodActivity: req.body.foodActivity,
        foodPicturePaths: req.body.foodPicturePaths,
        categoryID: req.body.categoryID,
        userID: req.body.userID
    })

    try {
        const saveFood = await foods.save()
        res.json(saveFood)
    } catch (err) {
        res.json({ errorMsg: err })
    }

});
// GET A FOOD BY FOOD ID
router.post('/getById', async(req, res) => {
    try {
        const food = await Foods.findById(req.body.id)
        res.json(food)
    } catch (err) {
        res.json({ message: err })
    }
});

//GET ALL FOOD THE USER HAVE
router.post('/getByUserId', async(req, res) => {
    try {
        const food = await Foods.find({ 'userID': req.body.userID })
        res.json(food)
    } catch (err) {
        res.json({ message: err })
    }
})



module.exports = router