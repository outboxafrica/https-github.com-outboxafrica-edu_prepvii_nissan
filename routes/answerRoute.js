const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answerModel');

//lists all the answers /listanswers
router.get('/', (req, res, next) => {
    // try {
    //     Answers
    // } catch (error) {
    //     res.send('Error occured, could not list answers '- error)
    // }

    //testing database with answers
    let popu = new Answers({ _id: mongoose.Types.ObjectId(), answer: "I think i preferr Php", toQuestion: "5f51325acd36e12f4cd0b693", userAnswering: "5f4fb154ba8d861e7023ead3" })
    popu.save() //saving before checking again

    Answers.find()
        .exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router; //exporting answer routes to index.js file