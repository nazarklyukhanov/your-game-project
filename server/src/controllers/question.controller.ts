import { Request, Response, NextFunction } from 'express';
import QuestionService from '../services/question.service';
import formatResponse from '../utils/response.format.util';

class QuestionController {
	static async getAllQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const questions = await QuestionService.getAllQuestions();
			res.status(200).json(formatResponse(200, 'All questions retrieved', questions));
		} catch (error) {
			next(error);
		}
	}

	static async getQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const questionId = parseInt(req.params.id, 10);
			const question = await QuestionService.getQuestionById(questionId);
			res.status(200).json(formatResponse(200, 'Question retrieved', question));
		} catch (error) {
			next(error);
		}
	}

	static async createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const question = await QuestionService.createQuestion(req.body);
			res.status(201).json(formatResponse(201, 'Question created', question));
		} catch (error) {
			next(error);
		}
	}

	static async updateQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const questionId = parseInt(req.params.id, 10);
			const question = await QuestionService.updateQuestion(questionId, req.body);
			res.status(200).json(formatResponse(200, 'Question updated', question));
		} catch (error) {
			next(error);
		}
	}

	static async deleteQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const questionId = parseInt(req.params.id, 10);
			await QuestionService.deleteQuestion(questionId);
			res.sendStatus(204);
		} catch (error) {
			next(error);
		}
	}
}

export default QuestionController;

