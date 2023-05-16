const Sequelize = require("sequelize");
const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");

// SavedRecipe.belongsTo(User, {
// 	foreignKey: "id",
// 	// or user_id
// });

// SavedRecipe.hasMany(Pantry, {
// 	foreignKey: "id",
// });

SavedRecipe.belongsTo(User, { foreignKey: "id" });

User.hasMany(SavedRecipe, { foreignKey: "id" });

module.exports = {
	User,
	Pantry,
	SavedRecipe,
};
