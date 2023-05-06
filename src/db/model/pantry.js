const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

const Pantry = sequelize.define("Pantry", {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		autoIncrement: true,
		primaryKey: true,
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
	},
});

module.exports = Pantry;
