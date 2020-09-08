const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Answers = require('../models/answerModel');
//importing Quesiton schema to retrieve all answers according to a QuestionID
const Questions = require('../models/questionModel')
const { route } = require('./userRoute');
const { json } = require('body-parser');


//lists all the answers /listanswers
router.get('/', async(req, res, next) => {
    try {
        Answers.find().exec().then(answer => { res.json(answer) })
    } catch (error) {
        res.status(500).json({ error: err })
    }
});

// {"answer":"","questions":"","user":""}
router.post('/addAnswer', (req, res, next) => {
    const answer = new Answers({
        _id: mongoose.Types.ObjectId(),
        answer: req.body.answer,
        questions: req.body.questions,
        user: req.body.user
    })

    answer
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(answer.toJSON);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})

//selects specific answer - BY ANSWER ID!
router.get('/:answerId', (req, res, next) => {
    Answers.findById(req.params.answerId)
        .exec()
        .then(answer => {


            res.status(200).json({
                answer: answer,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/listanswers"
                }
            })

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

//deletes answer by answer id (needs to be done after user has logged in)
router.delete("/delete/:answerId", (req, res, next) => {
    Answers.remove({ _id: req.params.answerId })
        .exec()
        .then(
            res.status(200).json({
                message: "Answer deleted sucessfully",
                request: {
                    type: "DELETE",
                    url: "http://localhost:4000/listanswers",
                    body: { userId: "ID", question: "String" }
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    error: err
                })
            })

        )
});

//Additional:
//1. User can view ALL answers to a specific question. Via the quesiton ID.
//1. GET - ALL Access

//2. User can view all answers to their question(s). Via the question ID
//2. GET - ALL Access with user priotity

//3. User can mark one answer as preferred out of all the responses their question got. 
//3. POST - Single Access with user priority

router.post('/:preferredAnswer/true', (req, res) => {

    Answers.findOneAndUpdate({ _id: req.params.preferredAnswer }, { preferred: 1 })
        .exec().then(data => res.status(200).json({
            message: data,
            request: {
                type: "GET",
                url: "http://localhost:4000/listanswers",
            }
        })).catch(err => {
            res.status(500).json({ error: err })
        });

})

module.exports = router; //exporting answer routes to index.js file