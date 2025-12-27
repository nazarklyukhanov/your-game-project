import { Model, DataTypes, Sequelize } from 'sequelize';
import { QuestionAttributes, QuestionCreationAttributes } from '../../types';

export default (sequelize: Sequelize): typeof Model<QuestionAttributes, QuestionCreationAttributes> => {
	class Question extends Model<QuestionAttributes, QuestionCreationAttributes> implements QuestionAttributes {
		declare id: number;
		declare question: string;
		declare answer: string;
		declare points: number;
		declare category_id: number;
		declare readonly createdAt: Date;
		declare readonly updatedAt: Date;

		static associate(models: any): void {
			this.hasMany(models.Round, { foreignKey: 'question_id', as: 'rounds' });
			this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
		}
	}

	Question.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			question: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			answer: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			points: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Categories',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'Question',
		},
	);

	return Question;
};

