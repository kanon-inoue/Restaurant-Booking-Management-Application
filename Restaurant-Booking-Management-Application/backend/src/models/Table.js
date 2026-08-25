const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
    {
        tableNumber: {
            type: Number,
            required: true,
            unique: true,
            min: 1,
        },

        capacity: {
            type: Number,
            required: true,
            min: 1,
        },

        isBooked: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Table', tableSchema);