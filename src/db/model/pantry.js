const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections.js");

<<<<<<< HEAD
class Pantry extends Model {}
=======
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
>>>>>>> b9dfa381fbf5a0e78c03aceee60843bd8e04b830

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
