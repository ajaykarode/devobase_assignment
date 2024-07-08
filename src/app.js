const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');
const emailRoutes = require('./routes/emailRoutes');
const { loadScheduledEmails } = require('./scheduler');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', emailRoutes);

// Connect to MongoDB
mongoose.connect(config.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        loadScheduledEmails();  // Load and schedule pending emails on startup
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

module.exports = app;
