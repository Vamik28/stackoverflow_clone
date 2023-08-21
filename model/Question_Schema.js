const mongoose = require('mongoose');

const Questions = new mongoose.Schema({
    question:{
        type: string,
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
        type :[string],
    }
},{
    timestamps: true
});

const user_detail_schema = new mongoose.model('user_detail',user_detail);

module.exports = user_detail_schema;