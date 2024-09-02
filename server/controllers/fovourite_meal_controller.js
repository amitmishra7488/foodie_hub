const FavouriteMeal = require("../models/favourite_meal");
const MealModels = require("../models/meal_models");
const UserModels = require("../models/user_model");


// Add recipe to favourites
const addFavourite = async (req, res) => {
    try {
        const { mealId } = req.body;
        const userId = req.user.user_id;

        // Fetch the meal details using mealId
        const meal = await MealModels.findByPk(mealId);

        if (!meal) {
            return res.status(404).json({ error: 'Meal not found' });
        }

        const { mealName, mealCategory, mealArea, mealInstructions, mealThumb, mealTags, mealYoutube } = meal;

        // Add the meal to the user's favourites
        const [favourite, created] = await FavouriteMeal.findOrCreate({
            where: { mealId,userId },
            defaults: {
                mealName,
                mealCategory,
                mealArea,
                mealInstructions,
                mealThumb,
                mealTags,
                mealYoutube
            }
        });

        if (created) {
            res.status(201).json({ message: 'Recipe added to favourites', favourite });
        } else {
            res.status(200).json({ message: 'Recipe already in favourites' });
        }
    } catch (error) {
        console.error('Error adding favourite:', error);
        res.status(500).json({ error: 'Error adding favourite' });
    }
};


// Get user's favourite recipes
const getFavourites = async (req, res) => {
    try {
        const userId  = req.user.user_id;
        const favourites = await FavouriteMeal.findAll({
            where: { userId },
        });

        res.json(favourites);
    } catch (error) {
        console.error('Error fetching favourites:', error);
        res.status(500).json({ error: 'Error fetching favourites' });
    }
};



module.exports = { addFavourite, getFavourites };