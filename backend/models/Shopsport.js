const mongoose = require('mongoose');

const shopsportSchema = new mongoose.Schema({
    sport:{
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport'
    },
    groundname: { 
        type: String, 
        required: true, 
    },
    priceperhour: { 
        type: Number, 
        default: 0 
    },
    maxplayers: {
        type: [Number], 
        default: [0]
    },
    image: {
        type: String
    },
    grounddimensions: { 
        length: { type: Number },
        width: { type: Number }
    },
    availability: [{
        day: { 
            type: String, 
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        times: [{
            start: { type: String, required: true },  
            end: { type: String, required: true } ,    
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
    reviews: [{ 
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
