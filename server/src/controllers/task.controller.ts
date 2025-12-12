import { Request, Response, NextFunction } from 'express';
import RoundService from '../services/task.service';
import formatResponse from '../utils/response.format.util';

class RoundController {
	static async getAllRounds(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const userId = req.query.userId ? parseInt(req.query.userId as string, 10) : null;
			const rounds = await RoundService.getAllRounds(userId);
			res.status(200).json(formatResponse(200, 'All rounds retrieved', rounds));
		} catch (error) {
			next(error);
		}
	}

	static async getRound(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roundId = parseInt(req.params.id, 10);
			const round = await RoundService.getRoundById(roundId);
			res.status(200).json(formatResponse(200, 'Round retrieved', round));
		} catch (error) {
			next(error);
		}
	}

	static async createRound(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const user_id = res.locals.user!.id;
			const round = await RoundService.createRound({
				...req.body,
				user_id,
			});
			res.status(201).json(formatResponse(201, 'Round created', round));
		} catch (error) {
			next(error);
		}
	}

	static async updateRound(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const roundId = parseInt(req.params.id, 10);
			const round = await RoundService.updateRound(roundId, req.body);
			res.status(200).json(formatResponse(200, 'Round updated', round));
		} catch (error) {
			next(error);
		}
	}

	static async answerQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { answer } = req.body;
			if (!answer) {
				return res.status(400).json(formatResponse(400, 'Answer is required', null, { error: 'Answer is required' }));
			}

			const roundId = parseInt(req.params.id, 10);
			const result = await RoundService.answerQuestion(roundId, answer);
			res.status(200).json(formatResponse(200, 'Answer processed', result));
		} catch (error) {
			next(error);
		}
	}
}

export default RoundController;

