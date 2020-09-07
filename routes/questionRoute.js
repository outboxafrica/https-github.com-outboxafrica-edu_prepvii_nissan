const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Questions = require('../models/questionModel');

//lists all the questions
router.get('/', (req, res, next) => {
    Questions.find()
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

//adds
router.post('/add', (req, res, next) => {
    const question = new Questions({
        _id: mongoose.Types.ObjectId(),
        question: req.body.question,
        user: req.body.userId
    });
    question
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

    res.status(201).json({
        message: 'Question was posted',
        question: question

    });

});
/*
router.get('/:questionId', (req, res, next) => {
    Questions.findById(req.params.questionId)
        .exec()
        .then(question => {
            res.status(200).json({
                question: question,
                request: {
                    type: "GET",
                    url: "http://localhost:4000/questionRoutes"
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

router.delete("/:questionId", (req, res, next) => {
    Questions.remove({ _id: req.params.questionId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Questions deleted sucessfully",
                request: {
                    type: "POST",
                    url: "http://localhost:4000/questionRoutes",
                    body: { userId: "ID", question: "String" }
                }
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})

router.put("/:questionId", (req, res, next) => {
    Questions.update({ _id: req.params.questionId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Question updated sucessfully",
                request: {
                    type: "POST",
                    url: "http://localhost:4000/questionRoutes",
                    body: { userId: "ID", question: "String" }
                }
            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })

})
*/
module.exports = router;