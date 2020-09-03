//connect through mongoose 
const mongoose = require('mongoose');
//question schema - User can post questions to server & view questions on correc route.


//declare a new mongoose instance
const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: {
        type: String,
        required: true
    }
});

//model questions (stored in database)
const Que = mongoose.model('Questions', questionSchema);

//export module
module.exports = Que;