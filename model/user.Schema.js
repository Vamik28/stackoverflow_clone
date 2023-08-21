const mongoose = require('mongoose');

const user_detail = new mongoose.Schema({
    contact_no:{
        type: Number,
        required:true
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email_id:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const user_detail_schema = new mongoose.model('user_detail',user_detail);

module.exports = user_detail_schema;