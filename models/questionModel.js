//connect through mongoose 
const mongoose = require('mongoose');
//question schema - User can post questions to server & view questions on correc troute.

//declare a new mongoose instance
const question = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    user: {
        //associated user (maybe identified in form of a userID?)
    }
});

//model questions (stored in database)
const Que = mongoose.model('question')

//user forms
//Question

//export module
module.exports = Que;