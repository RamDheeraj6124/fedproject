const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    equipmentRequired: [{ 
        type: String
    }],
    rules: [{ 
        type: String
    }]
});

module.exports = mongoose.model('Sport', sportSchema);
