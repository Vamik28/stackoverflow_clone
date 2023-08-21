var mongoose = require('mongoose');
// connect db 
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL,(err) => {
    if(err){
        console.log('not connected');
}else{
    console.log('db connected');
}});
module.exports = mongoose;