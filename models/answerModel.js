///connect through mongoose 
const mongoose = require('mongoose');
//answer schema - User can post answers to questions to the server 
//& view answers to questions when on the correct route.

//declare a new mongoose instance
const answerSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //generates unique answer id
    answer: {
        type: String,
        required: true
    }, //id of specific question being answered.
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions' },
    userId: { //id of user who is answering the question
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    }, //Only User that posted Question at ID(toQuestion) will have the right to change this value.
    preferred: { //true if the User who posted 'toQuestion'(id), marks it as their preferred answer.
        type: Boolean,
        default: false
    }, //number of votes this answer has. 
    totalVotes: {
        type: Number,
        default: 0
    }
});

//model answers (stored in mongo database)
const Ans = mongoose.model('Answers', answerSchema);

//export module to be used in other files in the project
module.exports = Ans;

//Schema - copy below to postman
//{"answer":"","toQuestion":"","userAnswering":"","preferred":false}
// answer IS string. question IS id. user answering IS id.