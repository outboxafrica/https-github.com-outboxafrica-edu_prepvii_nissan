const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answerModel');

//lists all the answers /listanswers
router.get('/', (req, res, next) => {
    router.send('Listing all answers');
    console.log('Listing all answers');
    // Answers.find()
    //     .exec()
    //     .then(doc => {
    //         res.status(200).json(doc)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //         res.status(500).json({
    //             error: err
    //         })
    //     })
});