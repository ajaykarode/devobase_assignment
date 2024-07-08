const nodemailer = require('nodemailer');
const config = require('./config');

let transporterOptions = {
    host: config.EMAIL_HOST,
    port: config.EMAIL_PORT,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    }
};

// Check if SSL should be enabled
if (config.ENABLE_SSL) {
    transporterOptions.secure = true;  // Use SSL/TLS
}

const transporter = nodemailer.createTransport(transporterOptions);


const sendEmail = async (email) => {
    const mailOptions = {
        from: config.EMAIL_USER,
        to: email.recipient,
        subject: email.subject,
        text: email.body
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email.recipient}`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
