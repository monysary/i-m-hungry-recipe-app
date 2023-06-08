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
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
  },
	{
		sequelize,
		modelName: "Comment",
	}
);

module.exports = Comment;