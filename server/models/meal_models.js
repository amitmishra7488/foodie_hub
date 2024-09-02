const { DataTypes } = require('sequelize');
const sequelize = require('../db/config');

const MealModels = sequelize.define('meals', {
    mealId: {
        type: DataTypes.INTEGER,  
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        field: 'meal_id'  
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id'  
    },
    mealName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'meal_name'  
    },
    mealCategory: {
        type: DataTypes.STRING,
        field: 'meal_category'  
    },
    mealArea: {
        type: DataTypes.STRING,
        field: 'meal_area'  
    },
    mealInstructions: {
        type: DataTypes.TEXT,
        field: 'meal_instructions' 
    },
    mealThumb: {
        type: DataTypes.STRING,
        field: 'meal_thumb'  
    },
    mealTags: {
        type: DataTypes.STRING,
        field: 'meal_tags' 
    },
    mealYoutube: {
        type: DataTypes.STRING,
        field: 'meal_youtube'  
    }
}, {
    timestamps: true,  
    underscored: true 
});

module.exports = MealModels;
