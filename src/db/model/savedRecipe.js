const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");
const User  = require("./user.js");
const Pantry = require('./pantry.js')

class SavedRecipe extends Model {}

SavedRecipe.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
  }
);


SavedRecipe.belongsTo(User, {
	foreignKey: "user_id",
});

SavedRecipe.hasMany(Pantry, {
	foreignKey: "recipe_id",
});

async function init() {
  await sequelize.sync();
    console.log("SavedRecipe table created successfully.");
}

init();

module.exports = SavedRecipe;