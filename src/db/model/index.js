const Sequelize = require("sequelize");
const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");
<<<<<<< HEAD

SavedRecipe.belongsTo(User, {
	foreignKey: "id",
	// or user_id
});

SavedRecipe.hasMany(Pantry, {
	foreignKey: "id",
});
=======
>>>>>>> b9dfa381fbf5a0e78c03aceee60843bd8e04b830

module.exports = {
	User,
	Pantry,
	SavedRecipe,
};
