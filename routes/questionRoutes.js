const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Questions = require('../models/questions');
const { userRegister, userLogin, userAuth, serlializeUser, checkRole } = require('../utils/config');

//const checkAuth=require('../middleware/passport')



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

router.post('/', userAuth, (req, res, next) => {
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

router.get('/:questionId', (req, res, next) => {
    Questions.findById(req.params.questionId)
        .exec()
        .then(question => {
            res.status(200).json({
                question: question,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/questionRoutes"
                }
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})
router.patch('/:questionId', userAuth, checkRole('admin', 'user'), (req, res, next) => {
    const id = req.params.questionId;
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Questions.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error"
            })
        })

})

router.delete("/:questionId", userAuth, checkRole('user'), (req, res, next) => {
    Questions.remove({ _id: req.params.questionId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Questions deleted sucessfully",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/questionRoutes",
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

module.exports = router;