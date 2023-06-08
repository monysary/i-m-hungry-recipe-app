const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

class Comment extends Model {}
Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 255], 
      },
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

module.exports = Comment;
