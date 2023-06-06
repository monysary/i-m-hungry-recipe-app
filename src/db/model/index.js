const Sequelize = require("sequelize");
const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");

SavedRecipe.belongsTo(User);

User.hasMany(SavedRecipe);

module.exports = {
	User,
	Pantry,
	SavedRecipe,
};
