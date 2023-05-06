const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

class Pantry extends Model {}

Pantry.init({
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
},
  {
    sequelize,
    modelName: "Pantry",
  }
);

async function init() {
  await sequelize.sync();
    console.log("pantry table created successfully.");
}

init();

module.exports = Pantry;
