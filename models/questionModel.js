//connect through mongoose 
const mongoose = require('mongoose');
//question schema - User can post questions to server & view questions on correc troute.

//declare a new mongoose instance
const user = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    user: {
        //associated user
    }
});

//model questions (stored in database)


//user forms
//Question

//export
exports.Schema =