const mongoose=require('mongoose');

const fdbSchema=new mongoose.Schema({
    feedback:String,
    userDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
const fdb=mongoose.model('feedback',fdbSchema);
module.exports=fdb;