const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

class RecipeLikes extends Model {}
RecipeLikes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "RecipeLikes",
  }
);

module.exports = RecipeLikes;
