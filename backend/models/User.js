const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    emailveified:{
        type:Boolean,
        default:false
    },
    otp: {
        type: String
    },
    otpExpiration: {
        type: String
    },
    password: {
        type: String,
        required: true,
    },
    bookings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking' // Reference to the Booking schema
    }],
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    contact: {
        type: String
    },
    revenuepercentage: {
        type: Number,
        default: 0 // Only meaningful for 'admin'
    },
    totalrevenue:{
        type:Number,
        default:0
    }
});



module.exports = mongoose.model('User', userSchema);
