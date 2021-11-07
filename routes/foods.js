const express = require('express');
const Foods = require('../models/Foods');
const router = express.Router();
// Last error code 4
// GET ALL FOODS
router.get('/', async(req, res) => {
    try {
        const foods = await Foods.find();
        res.json(foods)
    } catch (err) {
        res.json({ message: err, errorCode: 2001 })
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
        ingredientIDs: req.body.ingredientIDs,
        categoryID: req.body.categoryID,
        userID: req.body.userID
    })

    try {
        const saveFood = await foods.save()
        console.log(saveFood)
        res.json(saveFood)
    } catch (err) {
        res.json({ errorMsg: err, errorCode: 2002 })
    }

});
// GET A FOOD BY FOOD ID
router.post('/getById', async(req, res) => {
    try {
        const food = await Foods.findById(req.body.id)
        res.json(food)
    } catch (err) {
        res.json({ message: err, errorCode: 2003 })
    }
});

//GET ALL FOOD THE USER HAVE
router.post('/getByUserId', async(req, res) => {
    try {
        const food = await Foods.find({ 'userID': req.body.userID })
        res.json(food)
    } catch (err) {
        res.json({ message: err, errorCode: 2004 })
    }
})



module.exports = router