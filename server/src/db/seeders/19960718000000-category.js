'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'Categories',
			[
				{
					id: 1,
					title: 'Как это вообще работает',
				},
				{
					id: 2,
					title: 'Смешно, потому что правда',
				},
				{
					id: 3,
					title: 'Логика без боли',
				},
				{
					id: 4,
					title: 'Кино, сериалы и мемы',
				},
				{
					id: 5,
					title: 'Музыка, которую ты слышал',
				},
				{
					id: 6,
					title: 'Ну это же очевидно…',
				},
			],
			{},
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Categories', null, {});
	},
};
