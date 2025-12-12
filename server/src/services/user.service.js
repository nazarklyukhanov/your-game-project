const User = require('../db/models');
const formatError = require('../utils/error.format.util');

class UserService {
	static getAllUsers() {
		return User.findAll();
	}

	static async getById(id) {
		const user = await User.findByPk(id);
		if (!user) formatError('User not found', 404);

		return user;
	}

	static async updateById(id, data) {
		const user = await User.findByPk(id);
		if (!user) formatError('User not found', 404);
		await User.update(data, { where: { id } });

		return User.findByPk(id);
	}

	static async deleteById(id) {
		const user = await User.findByPk(id);
		if (!user) formatError('User not found', 404);
		await User.destroy({ where: { id } });
	}
}

module.exports = UserService;
