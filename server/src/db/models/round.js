const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Round extends Model {
		static associate(models) {
			this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		}
	}
	Round.init(
		{
			score: DataTypes.INTEGER,
			status: DataTypes.BOOLEAN,
			question_id: DataTypes.INTEGER,
			user_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Round',
		},
	);
	return Round;
};
