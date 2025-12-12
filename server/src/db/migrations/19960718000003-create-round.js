module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Rounds', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			score: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			status: {
				allowNull: false,
				type: Sequelize.BOOLEAN,
			},
			question_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				reference: {
					model: 'Questions',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			user_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				reference: {
					model: 'Users',
					key: 'id',
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('NOW'),
			},
		});
	},
	async down(queryInterface) {
		await queryInterface.dropTable('Rounds');
	},
};
