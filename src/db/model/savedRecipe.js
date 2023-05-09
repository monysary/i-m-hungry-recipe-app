const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connections.js");

<<<<<<< HEAD
class SavedRecipe extends Model {}

SavedRecipe.init({
    username: {
			type: DataTypes.STRING,
			allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yield: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    instructions :{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
},
  {
    sequelize,
    modelName: "SavedRecipe",
    // beforeCreate will be called before SavedRecipe instance is created. Ingredients and instruction arrays are joined into strings using join method with new line seperator. Then we save those strings in the database.
    hooks: {
      beforeCreate: (recipe) => {
        recipe.ingredients = recipe.ingredients.join("\n");
        recipe.instructions = recipe.instructions.join("\n");
      },
      beforeUpdate: (recipe) => {
        if (Array.isArray(recipe.ingredients)) {
          recipe.ingredients = recipe.ingredients.join("\n");
        }
        if (Array.isArray(recipe.instructions)) {
          recipe.instructions = recipe.instructions.join("\n");
        }
      },
      // after finding recipe, split ingredients and instructions strings into arrays w/ split method and a new line separator
      afterFind: (recipe) => {
        if (typeof recipe.ingredients === "string") {
          recipe.ingredients = recipe.ingredients.split("\n");
        }
        if (typeof recipe.instructions === "string") {
          recipe.instructions = recipe.instructions.split("\n");
        }
      },
    }
  });

// SavedRecipe.sync();
=======
const SavedRecipe = sequelize.define('SavedRecipe', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  servings: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yield: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ingredients: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
  instructions: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
  },
});
>>>>>>> b9dfa381fbf5a0e78c03aceee60843bd8e04b830

module.exports = SavedRecipe;