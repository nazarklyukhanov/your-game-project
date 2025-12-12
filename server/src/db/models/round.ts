import { Model, DataTypes, Sequelize } from 'sequelize';
import { RoundAttributes, RoundCreationAttributes } from '../../types';

export default (sequelize: Sequelize): typeof Model<RoundAttributes, RoundCreationAttributes> => {
	class Round extends Model<RoundAttributes, RoundCreationAttributes> implements RoundAttributes {
		declare id: number;
		declare score: number;
		declare status: boolean;
		declare question_id: number;
		declare user_id: number;
		declare readonly createdAt: Date;
		declare readonly updatedAt: Date;

		static associate(models: any): void {
			this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
			this.belongsTo(models.Question, { foreignKey: 'question_id', as: 'question' });
		}
	}

	Round.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			score: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			status: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			question_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Questions',
					key: 'id',
				},
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Users',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			modelName: 'Round',
		},
	);

	return Round;
};

