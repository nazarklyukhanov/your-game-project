import db from '../db/models';
import formatError from '../utils/error.format.util';

const { User } = db;

class UserService {
	static async getAllUsers() {
		const users = await User.findAll({
			attributes: { exclude: ['password'] },
		});
		return users;
	}

	static async getById(id: number) {
		const user = await User.findByPk(id, {
			attributes: { exclude: ['password'] },
		});
		if (!user) {
			throw formatError('User not found', 404);
		}
		return user;
	}

	static async updateById(id: number, data: Partial<{ name: string; email: string; password: string }>) {
		const user = await User.findByPk(id);
		if (!user) {
			throw formatError('User not found', 404);
		}
		await User.update(data, { where: { id } });
		const updatedUser = await User.findByPk(id, {
			attributes: { exclude: ['password'] },
		});
		return updatedUser;
	}

	static async deleteById(id: number) {
		const user = await User.findByPk(id);
		if (!user) {
			throw formatError('User not found', 404);
		}
		await User.destroy({ where: { id } });
	}
}

export default UserService;

