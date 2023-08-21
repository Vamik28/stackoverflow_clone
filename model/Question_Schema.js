const mongoose = require('mongoose');

const questions = new mongoose.Schema({
    question:{
        type: String,
        required:true
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
        
    },
    upvotes:{
        type: Number,
        
    },
    downvotes:{
        type: Number,
    },
    Comments:{
        type :[String],
    }
},{
    timestamps: true
});

const questions_schema = new mongoose.model('questions',questions);

module.exports = questions_schema;