const urlService = require('../services/url.service');

const createShortUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: 'originalUrl is required',
      });
    }

    const url = await urlService.createShortUrl(originalUrl);

    return res.status(201).json({
      success: true,
      message: 'Short URL created successfully',
      data: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: `${req.protocol}://${req.get('host')}/${url.shortCode}`,
      },
    });
  } catch (error) {
    console.error('Create short URL error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to create short URL',
    });
  }
};

const redirectToOriginalUrl = async (req, res) => {
  try {
    const { shortCode } = req.params;

    const url = await urlService.getOriginalUrl(shortCode);

    if (!url) {
      return res.status(404).json({
        success: false,
        message: 'Short URL not found',
      });
    }

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.error('Redirect error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Failed to redirect',
    });
  }
};

module.exports = {
  createShortUrl,
  redirectToOriginalUrl,
};