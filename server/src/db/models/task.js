const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Task extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		}
	}
	Task.init(
		{
			title: DataTypes.STRING,
			status: DataTypes.STRING,
			deadline: DataTypes.STRING,
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Task',
		},
	);
	return Task;
};
