const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");

User.hasMany(SavedRecipe, {
	foreignKey: "userId",
});

SavedRecipe.belongsTo(User, {
	foreignKey: "userId",
});

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
