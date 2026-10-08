'use strict';
const express = require('express');
const cors = require('cors');
const urlRoutes = require('./routes/url.routes');
const { redirectToOriginalUrl } = require('./controllers/url.controller');

const app = express();

// Middleware
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'] }));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'URL Shortener API is running successfully'
    });
});

// API Routes
app.use('/api/urls', urlRoutes);

// Short URL redirect — must be LAST to avoid conflicts with other routes
app.get('/:shortCode', redirectToOriginalUrl);

module.exports = app;