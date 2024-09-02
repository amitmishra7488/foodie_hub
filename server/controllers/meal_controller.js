const MealModels = require("../models/meal_models");

const addMeal = async (req, res) => {
    try {
        const { mealName, mealCategory, mealArea, mealInstructions, mealTags, mealYoutube } = req.body;
        const userId = req.user.user_id;
        const mealThumb = req.file ? req.file.path : null; 
        // Check if the meal already exists
        const existingMeal = await MealModels.findOne({
            where: { mealName, userId }
        });

        if (existingMeal) {
            return res.status(400).json({ message: 'Meal already exists for this user.' });
        }

        // Create a new meal
        const newMeal = await MealModels.create({
            userId,
            mealName,
            mealCategory,
            mealArea,
            mealInstructions,
            mealThumb,
            mealTags,
            mealYoutube
        });

        res.status(201).json({ message: 'Meal added successfully.', meal: newMeal });
    } catch (error) {
        console.error('Error adding meal:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};



module.exports =  {addMeal}