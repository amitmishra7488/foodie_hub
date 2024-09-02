require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./db/config');
const AllRoutes = require('./routes/routes');
const requestLimiter = require('./middleware/request_throttling');
const app = express();

const corsOptions = {
    methods: 'GET,POST,PUT,DELETE', // Allowed methods
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLimiter);

// APIs
app.use('/', AllRoutes);
app.use("/", (req, res) => res.send("Welcome to foodie_hub backend Zone!"));

// Synchronize the models with the database and start the server
sequelize.sync({ alter: false })
    .then(() => {
        console.log('Database & tables synced successfully');
        app.listen(8080, () => {
            console.log(`Server is running on port ${8080}`);
        });
    })
    .catch(err => {
        console.error('Database sync error:', err);
        // Optionally, you could terminate the process here if sync fails
        process.exit(1);
    });
