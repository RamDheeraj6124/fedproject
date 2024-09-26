const mongoose = require('mongoose');

const shopsportSchema = new mongoose.Schema({
    groundname: { 
        type: String, 
        required: true, 
    },
    priceperhour: { 
        type: Number, 
        default: 0 
    },
    maxplayers: {
        type: [Number], // Array to accommodate different configurations, e.g., [1, 2, 4]
        default: [0]
    },
    image: {
        type: String
    },
    grounddimensions: { // Adding ground dimensions here as requested
        length: { type: Number }, // E.g., 50 (meters)
        width: { type: Number }   // E.g., 30 (meters)
    },
    availability: [{
        day: { 
            type: String, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        times: [{
            start: { type: String, required: true },  // E.g., '08:00 AM'
            end: { type: String, required: true } ,    // E.g., '10:00 PM'
        }]
    }],
    facilities: [{
        type: String
    }],
    surfacetype: {
        type: String,
        enum: ['Grass', 'Turf', 'Clay', 'Hard', 'Synthetic'],
        default: 'Grass'
    },
    reviews: [{ // Adding reviews
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 },
        comment: { type: String },
        date: { type: Date, default: Date.now }
    }],
    status: { 
        type: String,
        enum: ['Active', 'Closed'],
        default: 'Active'
    },
    verify: {
        type: Boolean,
        default: false
    },
    appliedforverification: {
        type: Boolean,
        default: false
    } 
}); 

module.exports = shopsportSchema;
