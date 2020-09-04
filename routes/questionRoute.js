//declaring node packages
const express = require('express');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');

//routing pages
const router = express.Router();
//importing question schema from "questionModel"
const Quest = require('../models/questionModel');
//importing user from "userModel" schema 
const User = require('../models/userModel');

//app.METHOD(PATH,HANDLER);
//step 1. validate user is logged in to be able to post a question
//step 2. allow user to post data to server. 
//step 3. capture users id/email & add question to database -(linking question to user)

router.get('/questions', (req, res) => {
    // Quest.find({});
    res.json({ "message": "Hello Json" });

})

/*
router.post('/postquestion', (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            first_name: req.body.first_name,
                            last_name: req.body.last_name,
                            email: req.body.email,
                            password: hash
                        })
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'User created'
                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })

            }
        })
})
*/

// router.post('login', (req, res, next) => {
//     User.find({ email: req.body.email })
//         .exec()
//         .then(user => {
//             if (user.length < 1) {
//                 return res.status(401).json({
//                     message: 'Auth failed'
//                 });
//             }
//             bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//                 if (err) {
//                     return res.status[401].json({
//                         message: 'Auth failed'
//                     })
//                 }
//                 if (result) {
//                     return res.status(200).json({
//                         message: "Auth successful"
//                     })
//                 }
//                 res.status(401).json({
//                     message: 'Auth failed'
//                 })
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             });
//         });
// });
// router.delete('/:userId', (req, res, next) => {
//     User.remove({ _id: req.params.userId })
//         .exec()
//         .then(result => {
//             res.status(200).json({
//                 message: "User deleted"
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({
//                 error: err
//             })
//         })
// })

module.exports = router