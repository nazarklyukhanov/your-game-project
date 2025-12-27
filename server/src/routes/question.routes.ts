import { Router } from 'express';
import { verifyAccessToken } from '../middleware/token.verify.middleware';
import QuestionController from '../controllers/question.controller';

const router = Router();

router
	.route('/')
	.get(QuestionController.getAllQuestions)
	.post(verifyAccessToken, QuestionController.createQuestion);

router
	.route('/:id')
	.get(QuestionController.getQuestion)
	.put(verifyAccessToken, QuestionController.updateQuestion)
	.delete(verifyAccessToken, QuestionController.deleteQuestion);

export default router;

