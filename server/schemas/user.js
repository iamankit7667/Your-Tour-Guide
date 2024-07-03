const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    id:String,
    name:String,
    username:String,
    phonenumber:String,
    email:String,
    gender:String,
    image:{
        type:String,
        default:'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-symbol-image-default-avatar-profile-icon-vector-social-media-user-symbol-209498286.jpg',
        trim:true
    },
    role:String,
    imagegiven:Boolean,
    feedbackgiven:Boolean,
    givenfeedback:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'feedback'
    },
    password:String,
    tourReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'review'
    }],
});
UserSchema.index({ email: 1, username: 1 });
const User=mongoose.model('User',UserSchema);
module.exports=User;