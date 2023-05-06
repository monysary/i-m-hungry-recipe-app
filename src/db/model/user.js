const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connections");
const bcrypt = require("bcrypt");

class User extends Model {
	checkPassword(loginPassword) {
		return bcrypt.compareSync(loginPassword, this.password);
	}
}

User.init(
	{
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: 8,
			},
		},
	},
	{
		hooks: {
			beforeCreate: async (newUser) => {
				newUser.password = await bcrypt.hash(newUser.password, 10);
				return newUser;
			},
			beforeUpdate: async (updateUser) => {
				if (updateUser.password) {
					updateUser.password = await bcrypt.hash(updateUser.password, 10);
				}
				return updateUser;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "hungry_user",
	}
);

module.exports = User;
