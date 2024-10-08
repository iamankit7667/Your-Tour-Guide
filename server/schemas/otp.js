const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: String,
    OTP: String,
    OTPTime: Number,
    keyword: String,
});
OTPSchema.index({ email: 1});
const OTP = mongoose.model('OTP', OTPSchema);
module.exports = OTP;