import { Model, DataTypes, Sequelize } from 'sequelize';
import { CategoryAttributes, CategoryCreationAttributes } from '../../types';

export default (sequelize: Sequelize): typeof Model<CategoryAttributes, CategoryCreationAttributes> => {
	class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
		declare id: number;
		declare title: string;
		declare description: string;
		declare readonly createdAt: Date;
		declare readonly updatedAt: Date;

		static associate(models: any): void {
			this.hasMany(models.Question, { foreignKey: 'category_id', as: 'questions' });
		}
	}

	Category.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Category',
		},
	);

	return Category;
};

