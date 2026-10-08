const express = require('express');

const { createShortUrl } = require('../controllers/url.controller');

const router = express.Router();

// Create a short URL
router.post('/', createShortUrl);

module.exports = router;