const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

class Pantry extends Model { }

Pantry.init(
  {
    ingredient: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM(
        'Protein',
        'Vegetables',
        'Fruits',
        'Grain',
        'Dairy',
        'Butter/Oil',
        'Spice',
        'Seasoning',
        'Other'
      ),
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pantry'
  }
)

// const Pantry = sequelize.define('Pantry', {
//   id: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   ingredient: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   category: {
//     type:DataTypes.ENUM('Protein', 'Vegetables', 'Fruits', 'Grain', 'Dairy', 'Butter/Oil', 'Spice', 'Seasoning',  'Other'),
//   },
// });

Pantry.init({
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

module.exports = Pantry;
