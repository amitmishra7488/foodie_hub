const rateLimit = require('express-rate-limit');


// Define a rate limiter
const requestLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 30, // Limit each IP to 30 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true
});

module.exports = requestLimiter