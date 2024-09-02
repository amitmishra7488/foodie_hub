const jwt = require('jsonwebtoken');

// Load environment variables
const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

// Function to generate JWT token
const generateJwtToken = (user) => {
    // Destructure user details
    const { user_id, username } = user;

    // payload
    const payload = {
        user_id,
        username
    };

    // Generate and return the token
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        console.log(user)
        req.user = user; 
        next();
    });
};

module.exports = { generateJwtToken,auth };
