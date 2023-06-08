const User = require("./user");
const Pantry = require("./pantry");
const SavedRecipe = require("./savedRecipe");
const Comment = require("./comment");

User.hasMany(SavedRecipe, {
  foreignKey: "userId",
});

SavedRecipe.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Pantry, {
  foreignKey: "userId",
});

Pantry.belongsTo(User, {
  foreignKey: "userId",
});

User.hasMany(Comment, {
  foreignKey: "userId",
});

Comment.belongsTo(User, { foreignKey: "userId" });

SavedRecipe.hasMany(Comment, {
  as: "recipeComments",
  foreignKey: "recipeId",
});

Comment.belongsTo(SavedRecipe, {
  as: "recipe",
  foreignKey: "recipeId",
});

module.exports = {
  User,
  Pantry,
  SavedRecipe,
  Comment,
};
