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
            console.log(user)
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
    try {
        const allUsers = await Users.find();
        allUsers.forEach(u => {
            if (u.userEmail == req.body.userEmail) {
                res.send({ message: "Email address already in use!", errorCode: 1001 });
                throw res;
            }
        });
        const user = new Users({
            userFullName: req.body.userFullName,
            userEmail: req.body.userEmail,
            userStatus: req.body.userStatus,
            userActivity: req.body.userActivity,
            userPassword: req.body.userPassword
        });

        const saveUser = await user.save();
        res.send(saveUser);
    } catch (err) {
        res.send({ message: 'Error had been occurred while signing up', errorCode: 1005 });
        throw err;
    }
});
// UPDATE USER
router.post('/update', async(req, res) => {
    try {
        const updatedPost = await Users.updateOne({ _id: req.body.userID }, {
            $set: {
                userEmail: req.body.userEmail,
                userFullName: req.body.userFullName
            }
        })
        res.send(updatedPost)
    } catch (err) {
        res.send({ message: err })
    }
});
// DELETE USER
router.post('/delete', async(req, res) => {
    try {
        const deletedPost = await Users.deleteOne({ _id: req.body.userID })
        res.send(deletedPost)
    } catch (err) {
        res.send({ message: err })
    }
});
module.exports = router;