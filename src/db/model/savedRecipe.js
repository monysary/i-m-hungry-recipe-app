const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connections.js");

class SavedRecipe extends Model {}

SavedRecipe.init(
	{
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
		ingredients: {
			type: DataTypes.TEXT,
			allowNull: false,
			get: function () {
				return JSON.parse(this.getDataValue("ingredients"));
			},
			set: function (value) {
				return this.setDataValue("ingredients", JSON.stringify(value));
			},
		},
		instructions: {
			type: DataTypes.TEXT,
			allowNull: false,
			get: function () {
				return JSON.parse(this.getDataValue("instructions"));
			},
			set: function (value) {
				return this.setDataValue("instructions", JSON.stringify(value));
			},
		},
	},
	// {
	// 	sequelize,
	// 	modelName: "SavedRecipe",
		// beforeCreate will be called before SavedRecipe instance is created. Ingredients and instruction arrays are joined into strings using join method with new line seperator. Then we save those strings in the database.

		// Below is if we had arrays, but we're doing JSON parsing into text, so it won't be an array.
		//   hooks: {
		//     beforeCreate: (recipe) => {
		//       recipe.ingredients = recipe.ingredients.join("\n");
		//       recipe.instructions = recipe.instructions.join("\n");
		//     },
		//     beforeUpdate: (recipe) => {
		//       if (Array.isArray(recipe.ingredients)) {
		//         recipe.ingredients = recipe.ingredients.join("\n");
		//       }
		//       if (Array.isArray(recipe.instructions)) {
		//         recipe.instructions = recipe.instructions.join("\n");
		//       }
		//     },
		//     // after finding recipe, split ingredients and instructions strings into arrays w/ split method and a new line separator
		//     afterFind: (recipe) => {
		//       if (typeof recipe.ingredients === "string") {
		//         recipe.ingredients = recipe.ingredients.split("\n");
		//       }
		//       if (typeof recipe.instructions === "string") {
		//         recipe.instructions = recipe.instructions.split("\n");
		//       }
		//     },
		//   }
		// });
{
sequelize,
modelName: "SavedRecipe",
hooks: {
  beforeCreate: (recipe) => {
    recipe.ingredients = JSON.stringify(recipe.ingredients);
    recipe.instructions = JSON.stringify(recipe.instructions);
  },
  beforeUpdate: (recipe) => {
    if (Array.isArray(recipe.ingredients)) {
      recipe.ingredients = JSON.stringify(recipe.ingredients);
    }
    if (Array.isArray(recipe.instructions)) {
      recipe.instructions = JSON.stringify(recipe.instructions);
    }
  },
  afterFind: (recipe) => {
    if (typeof recipe.ingredients === "string") {
      recipe.ingredients = JSON.parse(recipe.ingredients);
    }
    if (typeof recipe.instructions === "string") {
      recipe.instructions = JSON.parse(recipe.instructions);
    }
  },
}
});

SavedRecipe.sync();

module.exports = SavedRecipe;