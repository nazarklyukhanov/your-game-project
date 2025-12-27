import { Request, Response, NextFunction } from 'express';
import StatsService from '../services/stats.service';
import formatResponse from '../utils/response.format.util';

class StatsController {
	static async getUserStats(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = req.params.userId 
				? parseInt(req.params.userId, 10) 
				: res.locals.user!.id;
			const stats = await StatsService.getUserStats(userId);
			res.status(200).json(formatResponse(200, 'User statistics retrieved', stats));
		} catch (error) {
			next(error);
		}
	}

	static async getAllUsersStats(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const stats = await StatsService.getAllUsersStats();
			res.status(200).json(formatResponse(200, 'All users statistics retrieved', stats));
		} catch (error) {
			next(error);
		}
	}
}

export default StatsController;

