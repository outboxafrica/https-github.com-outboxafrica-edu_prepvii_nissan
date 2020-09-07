//connect through mongoose 
const mongoose = require('mongoose');
//question schema - User can post questions to server & view questions on correc route.

//declare a new mongoose instance
const questionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //question id
    question: {
        type: String,
        required: true
    }, //the person asking the question. Their id.
    asker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}); //

//model questions (stored in database)
const Que = mongoose.model('Questions', questionSchema);

//export module
module.exports = Que;