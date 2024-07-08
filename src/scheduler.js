const cron = require('node-cron');
const Email = require('./models/emailModel');
const sendEmail = require('./emailService');

// Schedule email sending
const scheduleEmail = (email) => {
    const { _id, scheduleTime } = email;
    const cronTime = new Date(scheduleTime);
    const cronTimeString = `${cronTime.getSeconds()} ${cronTime.getMinutes()} ${cronTime.getHours()} ${cronTime.getDate()} ${cronTime.getMonth() + 1} * ${cronTime.getFullYear()}`;    // const cronTime = new Date(email.scheduleTime);
    // cron.schedule('10 45 21 08 07 2 2024', async () => {
    cron.schedule(cronTimeString, async () => {
        try {
            await sendEmail(email);
            await Email.findByIdAndUpdate(email._id, { status: 'sent' });
        } catch (error) {
            console.error('Error sending scheduled email:', error);
        }
    });
};

// Load and schedule all pending emails on startup
const loadScheduledEmails = async () => {
    try {
        const emails = await Email.find({ status: 'scheduled' });
        emails.forEach(scheduleEmail);
    } catch (error) {
        console.error('Error loading scheduled emails:', error);
    }
};

module.exports = { scheduleEmail, loadScheduledEmails };

