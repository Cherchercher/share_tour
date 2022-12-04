const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    tourId: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
    numberOfPeople: { type: Number, required: true},
    budgetPerPerson: { type: Number}, 
    currency: {
        type: String,
    },
    dates: {
        type: Array,
        require: true
    },
    userInfo: {
        contactNumber: {type: Number},
        email: {type: String},
        firstName: {type: String},
        _id: {type: String}
    }
}, { timestamps: true });

module.exports = mongoose.model('Interest', interestSchema);
