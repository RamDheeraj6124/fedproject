// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Shop'
    },
    groundname:{
     type:String,
    },
    date: {
        type: Date,
        required: true
    },
    platformfee:{
     type:Number
    },
    groundfee:{
     type:Number
    },
    timeSlot: {
        start: {
            type: String, 
            required: true
        },
        end: {
            type: String, 
            required: true
        }
    },
    amountPaid: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Cancelled'],
        default: 'Pending'
    },
    paymentDate: {
        type: Date
    },
    transactionId: {
        type: String 
    },
    cancellationReason: {
        type: String,
    },
    cancellationDate: {
        type: Date 
    },
    refundAmount: {
        type: Number, 
    },checkInTime: {
        type: Date 
    },
    checkOutTime: {
        type: Date 
    },
    feedback: {
        rating: {
            type: Number, 
            min: 1,
            max: 5
        },
        review: {
            type: String 
        },
        feedbackDate: {
            type: Date
        }
    }
        
    
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
