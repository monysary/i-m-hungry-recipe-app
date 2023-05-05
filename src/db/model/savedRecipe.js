const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");
const User  = require("./user.js");
const Pantry = require('./pantry.js')

const SavedRecipe = sequelize.define('SavedRecipe'), {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false;
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

SavedRecipe.belongsTo(User, { foreignKey: 'user_id' });
SavedRecipe.belongsToMany(Pantry, { through: 'recipe_pantry', foreignKey: 'recipe_id' });
  
module.exports = SavedRecipe;