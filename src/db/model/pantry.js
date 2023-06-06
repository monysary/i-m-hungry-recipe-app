const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

class Pantry extends Model {}

Pantry.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
		ingredient: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		category: {
			type: DataTypes.ENUM(
				"Protein",
				"Vegetables",
				"Fruits",
				"Grain",
				"Dairy",
				"Butter/Oil",
				"Spice",
				"Seasoning",
				"Other"
			),
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		createdAt: "created_at",
		updatedAt: "updated_at",
		freezeTableName: true,
		underscored: true,
		modelName: "pantry",
	}
);
Pantry.removeAttribute('id');

module.exports = Pantry;
