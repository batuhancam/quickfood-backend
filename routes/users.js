const express = require('express')
const Users = require('../models/Users')
const router = express.Router()

// GET ALL USERS
router.get('/', async(req, res) => {
    try {
        const users = await Users.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err })
    }
});
// GET A USER BY USERID
router.get('/:userID', async(req, res) => {
    try {
        const user = await Users.findById(req.params.userID)
        res.json(user)
    } catch (err) {
        res.json({ message: err })
    }
});
// REGISTER A USER
router.post('/signup', async(req, res) => {
    const user = new Users({
        userFullName: req.body.userFullName,
        userEmail: req.body.userEmail,
        userStatus: req.body.userStatus,
        userActivity: req.body.userActivity,
        userPassword: req.body.userPassword
    })

    try {
        const saveUser = await user.save()
        res.json(saveUser)
    } catch (err) {
        res.json({ errorMsg: err })
    }


});
module.exports = router