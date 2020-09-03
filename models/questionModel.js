//connect through mongoose 
const mongoose = require('mongoose');
//question schema - User can post questions to server & view questions on correc route.


//declare a new mongoose instance
const question = new mongoose.Schema({
    question: {
        type: String,
        required: true
    }

});

//model questions (stored in database)
const Que = mongoose.model('question')

//user forms
//Question

//export module
module.exports = Que;