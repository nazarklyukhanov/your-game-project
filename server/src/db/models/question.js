const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Question extends Model {
		static associate(models) {
			this.hasMany(models.Round, { foreignKey: 'question_id', as: 'question' });
			this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
		}
	}
	Question.init(
		{
			question: DataTypes.STRING,
			answer: DataTypes.STRING,
			points: DataTypes.INTEGER,
			category_id: DataTypes.INTEGER,
		},
		{
			sequelize,
			modelName: 'Question',
		},
	);
	return Question;
};
