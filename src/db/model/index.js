const Sequelize = require("sequelize");
const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");

SavedRecipe.belongsTo(User);

User.hasMany(SavedRecipe);

User.hasMany(Pantry, {
	foreignKey: "userId",
})

Pantry.belongsTo(User, {
	foreignKey: "userId",
})


module.exports = {
	User,
	Pantry,
	SavedRecipe,
};
