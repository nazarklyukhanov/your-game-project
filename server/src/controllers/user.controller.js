const UserService = require('../services/user.service');
const formatResponse = require('../utils/response.format.util');

class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const users = await UserService.getAllUsers();
			res.status(200).json(formatResponse(200, 'All users', users));
		} catch (error) {
			next(error);
		}
	}

	static async getUser(req, res, next) {
		try {
			const user = await UserService.getById(req.params.id);
			res.status(200).json(formatResponse(200, 'User found', user));
		} catch (error) {
			next(error);
		}
	}

	static async updateUser(req, res, next) {
		try {
			const user = await UserService.updateById(req.params.id, req.body);
			res.status(200).json(formatResponse(200, 'User data updated', user));
		} catch (error) {
			next(error);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			await UserService.deleteById(req.params.id);
			res.sendStatus(204);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = UserController;
