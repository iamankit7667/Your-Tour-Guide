const mongoose=require('mongoose');

const bookSchema=new mongoose.Schema({
    id:String,
    username:String,
    fromdate:String,
    todate:String,
    paymentDone: Boolean,
    numberOfpassengers: Number,
    passengers: Array,
    placedetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    },
    paymentDetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'payment'
    },
    reviewGiven: {
        type: Boolean,
        default: false
    }
});
bookSchema.index({ username: 1});
const booking=mongoose.model('book',bookSchema);
module.exports=booking;