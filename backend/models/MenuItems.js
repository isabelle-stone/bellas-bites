const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        reuquired: true
    },
    price: {
        type: Number,
        reuquired: true
    },
    description: {
        type: String,
        reuquired: true
    },
    image: {
        type: String,
        reuquired: true
    },
    catagory: {
        type: String,
        reuquired: true,
        enum: ['breakfast', 'lunch', 'dinner']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('MenuItem', menuItemSchema);