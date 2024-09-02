const express = require('express');
const { addFavourite, searchMeal, getFavourites } = require('../controllers/fovourite_meal_controller');
const { auth } = require('../middleware/auth');
const { addMeal } = require('../controllers/meal_controller');
const upload = require('../utils/multer');
const router = express.Router();




// Define route for users favourite meals
router.post('/add-favourite', auth , addFavourite);
router.get('/favourite', auth, getFavourites);
router.post('/add-meal-data', auth, upload.single('mealThumb'), addMeal);

module.exports = router;
