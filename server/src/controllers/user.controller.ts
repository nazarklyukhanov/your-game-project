import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';
import formatResponse from '../utils/response.format.util';

class UserController {
	static async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const users = await UserService.getAllUsers();
			res.status(200).json(formatResponse(200, 'All users', users));
		} catch (error) {
			next(error);
		}
	}

	static async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = parseInt(req.params.id, 10);
			const user = await UserService.getById(userId);
			res.status(200).json(formatResponse(200, 'User found', user));
		} catch (error) {
			next(error);
		}
	}

	static async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = parseInt(req.params.id, 10);
			const user = await UserService.updateById(userId, req.body);
			res.status(200).json(formatResponse(200, 'User data updated', user));
		} catch (error) {
			next(error);
		}
	}

	static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = parseInt(req.params.id, 10);
			await UserService.deleteById(userId);
			res.sendStatus(204);
		} catch (error) {
			next(error);
		}
	}
}

export default UserController;

