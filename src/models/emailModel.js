const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
    recipient: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    scheduleTime: { type: Date, required: true },
    status: { type: String, enum: ['scheduled', 'sent', 'cancelled'], default: 'scheduled' }
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
