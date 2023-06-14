const User = require("./user")
const Pantry = require("./pantry")
const SavedRecipe = require("./savedRecipe")
const Comment = require("./comment")
const RecipeLikes = require("./recipeLikes")

<<<<<<< HEAD
SavedRecipe.belongsTo(User);

User.hasMany(SavedRecipe);
=======
User.hasMany(SavedRecipe, {
  foreignKey: "userId",
})

SavedRecipe.belongsTo(User, {
  foreignKey: "userId",
})
>>>>>>> cc3c6bea0e6a5b4391ad732451776cada113d7c4

User.hasMany(Pantry, {
  foreignKey: "userId",
})

Pantry.belongsTo(User, {
  foreignKey: "userId",
})

User.hasMany(Comment, {
  foreignKey: "userId",
})

Comment.belongsTo(User, { foreignKey: "userId" })

SavedRecipe.hasMany(Comment, {
  as: "recipeComments",
  foreignKey: "recipeId",
})

Comment.belongsTo(SavedRecipe, {
  as: "recipe",
  foreignKey: "recipeId",
})

SavedRecipe.hasMany(RecipeLikes, {
  foreignKey: "recipeId",
})

RecipeLikes.belongsTo(SavedRecipe, {
  foreignKey: "recipeId",
})

module.exports = {
  User,
  Pantry,
  SavedRecipe,
  Comment,
  RecipeLikes,
}
