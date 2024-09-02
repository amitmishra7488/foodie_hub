const { generateJwtToken } = require('../middleware/auth');
const UserModels = require('../models/user_model');
const { hashPassword, verifyPassword } = require('../utils/password_hashing');


const createUser = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Check if user already exists
        const existingUser = await UserModels.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists with this email' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = await UserModels.create({ username, password: hashedPassword, email });

        // Return the created user
        res.status(201).json({
            id: user.id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        // Find the user by email
        const user = await UserModels.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify the password
        const isMatch = await verifyPassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateJwtToken(user);

        // Response
        res.status(200).json({
            id: user.id,
            username: user.username,
            email: user.email,
            token: token
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



module.exports = {createUser,loginUser}
