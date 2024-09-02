const express = require('express');
const userRoutes = require('./user_routes');
const mealRoutes = require('./meal_routes');
const router = express.Router();


// Use the routes
router.use('/user', userRoutes);
router.use('/meals', mealRoutes);


module.exports = router;
