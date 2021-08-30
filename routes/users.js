const express = require('express')
const Users = require('../models/Users')
const router = express.Router();
// Last Error Code 9
// GET ALL USERS
router.get('/', async(req, res) => {
    try {
        const users = await Users.find();
        res.json(users)
    } catch (err) {
        res.json({ message: err, errorCode: 1006 })
    }
});
// GET A USER BY USERID
router.post('/getByUserID', async(req, res) => {
    try {
        const user = await Users.findById(req.body.userID)
        if (user) {
            res.json(user)
        } else {
            res.json({ message: 'User not found!', errorCode: 1002 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 1004 })
    }
});
// GET A USER BY EMAIL
router.post('/getByEmail', async(req, res) => {
    try {
        const user = await Users.find({ userEmail: req.body.userEmail });
        if (user) {
            res.json(user)
        } else {
            res.json({ message: 'User not found!', errorCode: 1003 })
        }
    } catch (err) {
        res.json({ message: err, errorCode: 1007 })
    }
});
// USER LOGIN
router.post('/logIn', async(req, res) => {
    try {
        const user = await Users.find({ userEmail: req.body.userEmail, userPassword: req.body.userPassword });
        if (user[0].userEmail != null) {
            res.json(user)
        } else {
            res.json({ message: 'User not found!', errorCode: 1008 })
        }
    } catch (err) {
        res.json({ message: 'User not found!', errorCode: 1009 })
    }
});
// USER REGISTER
router.post('/signUp', async(req, res) => {

    const allUsers = await Users.find();

    allUsers.forEach(u => {
        if (u.userEmail == req.body.userEmail) {
            res.json({ message: "Email address already in use!", errorCode: 1001 })
        }
    });

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
        res.json({ message: err, errorCode: 1005 })
    }
});
module.exports = router