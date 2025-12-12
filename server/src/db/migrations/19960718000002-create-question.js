module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Questions', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			question: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			answer: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			points: {
				allowNull: false,
				type: Sequelize.INTEGER,
			},
			category_id: {
				allowNull: false,
				type: Sequelize.INTEGER,
				reference: {
					model: 'Categories',
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
		await queryInterface.dropTable('Questions');
	},
};
