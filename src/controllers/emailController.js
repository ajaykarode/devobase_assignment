const Email = require('../models/emailModel');
const { scheduleEmail } = require('../scheduler');

// Schedule a new email
exports.scheduleEmail = async (req, res) => {
    try {
        const { recipient, subject, body, scheduleTime } = req.body;
        if (!recipient || !subject || !body || !scheduleTime) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const email = new Email({ recipient, subject, body, scheduleTime });
        await email.save();
        scheduleEmail(email);
        res.status(201).json({ message: 'Email scheduled successfully', email });
    } catch (error) {
        console.error('Error scheduling email:', error);  // Log detailed error message
        res.status(500).json({ message: 'Error scheduling email : ', error });
    }
};



// // Get all scheduled emails
exports.getScheduledEmails = async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving emails', error });
    }
};

// Get details of a specific scheduled email
exports.getScheduledEmailById = async (req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.status(200).json(email);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving email', error });
    }
};

// Cancel a scheduled email
exports.cancelScheduledEmail = async (req, res) => {
    try {
        const email = await Email.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled' },
            { new: true }
        );
        if (!email) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.status(200).json({ message: 'Email cancelled successfully', email });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling email', error });
    }
};
