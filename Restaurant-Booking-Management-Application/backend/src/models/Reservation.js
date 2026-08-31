const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        table: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Table',
            required: true,
        },

        partySize: {
            type: Number,
            required: true,
            min: 1,
        },

        startTime: {
            type: Date,
            required: true,
        },

        endTime: {
            type: Date,
            required: true,
        },

        status: {
            type: String,
            enum: [
                'pending',
                'approved',
                'rejected',
                'cancelled',
            ],
            default: 'pending',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    'Reservation',
    reservationSchema
);
