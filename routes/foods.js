const e = require('express');
const express = require('express');
const axios = require('axios');
const Foods = require('../models/Foods');
const Ingredients = require('../models/Ingredients');
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
router.post('/getByCategoryId', async(req, res) => {
    try {
        const food = await Foods.find({ 'categoryID': req.body.categoryID })
        res.json(food)
    } catch (err) {
        res.json({ message: err, errorCode: 2004 })
    }
})

router.post('/getByIngredients', async(req, res) => {
        let searchedFoods = [];

        const foods = await Foods.find();
        const ingredients = req.body.ingredients;
        ingredients.map(ingredient => {
            foods.map(food => {
                let ingredientCounter = 0;
                if(food.ingredientIDs.includes(ingredient)){
                    searchedFoods.push(food)
                }else{
                    ingredientCounter++;
                    if(ingredientCounter >= Math.ceil(food.ingredientIDs.length/2)){
                        searchedFoods = searchedFoods.filter(sf => {
                            return sf != food
                        })
                    }
                }
            })
        })

        const uniqueFoods = searchedFoods.filter(function(item, pos) {
            return searchedFoods.indexOf(item) == pos;
        })
        
        res.json(uniqueFoods);
})


module.exports = router