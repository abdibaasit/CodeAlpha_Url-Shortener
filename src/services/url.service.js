const{nanoid}= require('nanoid');
const Url = require('../models/url.model');

const createShortUrl = async (originalUrl)=>{
    const shortCode= nanoid(6);

    const url = await Url.create({
        originalUrl,
        shortCode,
    });

    return url;

};

const getOriginalUrl = async (shortCode)=>{
    const url = await Url.findOne({shortCode});

    return url;
};

module.exports = {createShortUrl, getOriginalUrl};