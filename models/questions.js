const { text } = require('express');
const mongoose=require('mongoose');

const questionSchema=mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required : true},
    question: {type: String, required: true}

});

module.exports=mongoose.model('Questions', questionSchema);