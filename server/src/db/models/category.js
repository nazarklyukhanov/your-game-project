const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Category extends Model {
		static associate(models) {
			this.hasMany(models.Category, { foreignKey: 'category_id', as: 'category' });
		}
	}
	Category.init(
		{
			title: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);
	return Category;
};
