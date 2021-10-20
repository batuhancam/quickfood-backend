const express = require('express')
const Categories = require('../models/Categories')
const router = express.Router();
//Last error code 7
// GET ALL CATEGORIES
router.get('/', async(req, res) => {
    try {
        const categories = await Categories.find();
        res.json(categories)
    } catch (err) {
        res.json({ message: err, errorCode: 5001 })
    }
});
// GET A USER BY CATEGORYID
router.post('/getByCategoryID', async(req, res) => {
    try {
        const category = await Categories.findById(req.body.categoryID)
        if (category) {
            res.json(category)
        } else {
            res.json({ message: 'Category not found!', errorCode: 5002 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 5003 })
    }
});
// GET A USER BY CATEGORYID
router.post('/getByCategoryName', async(req, res) => {
    try {
        const category = await Categories.find({CategoryName: req.body.categoryName})
        if (category) {
            res.json(category)
        } else {
            res.json({ message: 'Category not found', errorCode: 5006 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 5007 })
    }
});
// CATEGORY ADD
router.post('/addCategories', async(req, res) => {
    try {
        const category = new Categories({
            CategoryName: req.body.categoryName
        });
        const saveCategory = await category.save();
        res.send(saveCategory);
    } catch (err) {
        res.send({ message: 'Error had been occurred while adding a new category', errorCode: 5004 });
        throw err;
    }
});
// DELETE CATEGORY
router.post('/delete', async(req, res) => {
    try {
        const deletedCategory = await Categories.deleteOne({ _id: req.body.categoryID })
        res.send(deletedCategory)
    } catch (err) {
        res.send({ message: err, errorCode: 5005 })
    }
});
module.exports = router;