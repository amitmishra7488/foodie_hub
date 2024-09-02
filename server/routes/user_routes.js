const express = require('express');
const { createUser, loginUser } = require('../controllers/user_controller'); // Adjust path as needed
const { addFavourite, getFavourites } = require('../controllers/fovourite_meal_controller');
const { auth } = require('../middleware/auth');
const router = express.Router();

// Define route for user signup
router.post('/signup', createUser);
router.post('/login', loginUser);


// Define route for users favourite meals
router.post('/add-favourite-meals', auth , addFavourite);
router.get('/favourite-meals', auth, getFavourites);

module.exports = router;
