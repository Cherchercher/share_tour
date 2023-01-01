const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    numberOfPeople: { type: Number, required: true},
    budget: { type: Number}, 
    currency: {
        type: String,
    },
    meetingPoint: {
        type: String,
    },
    eventDetails: {
        type: String,
    },
    pricingStrategy: {
        type: String,
    },
    startDatetime: {
        type: String
    },
    endDatetime: {
        type: String
    },
    ownerId: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
