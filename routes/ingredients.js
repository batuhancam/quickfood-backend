const express = require('express')
const Ingredients = require('../models/Ingredients')
const router = express.Router();
//Last error code 7
// GET ALL INGREDIENTS
router.get('/', async(req, res) => {
    try {
        const ingredients = await Ingredients.find();
        res.json(ingredients)
    } catch (err) {
        res.json({ message: err, errorCode: 5001 })
    }
});
// GET A USER BY INGREDIENTID
router.post('/getByIngredientID', async(req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.body.ingredientID)
        if (ingredient) {
            res.json(ingredient)
        } else {
            res.json({ message: 'Ingredient not found!', errorCode: 5002 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 5003 })
    }
});
// GET BY INGREDIENTNAME
router.post('/getByIngredientName', async(req, res) => {
    try {
        const ingredient = await Ingredients.find({ingredientName: req.body.ingredientName})
        if (ingredient) {
            res.json(ingredient)
        } else {
            res.json({ message: 'Ingredient not found', errorCode: 5006 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 5007 })
    }
});
// INGREDIENT ADD
router.post('/addIngredients', async(req, res) => {
    try {
        const ingredient = new Ingredients({
            ingredientName: req.body.ingredientName,
        });
        const saveIngredient = await ingredient.ave();
        res.send(saveIngredient);
    } catch (err) {
        res.send({ message: err, errorCode: 5004 });
        throw err;
    }
});
// DELETE INGREDIENT
router.post('/delete', async(req, res) => {
    try {
        const deletedIngredient = await Ingredients.deleteOne({ _id: req.body.ingredientID })
        res.send(deletedIngredient)
    } catch (err) {
        res.send({ message: err, errorCode: 5005 })
    }
});
module.exports = router;