import { Router } from 'express';
import { verifyAccessToken } from '../middleware/token.verify.middleware';
import RoundController from '../controllers/task.controller';

const router = Router();

router
	.route('/')
	.get(verifyAccessToken, RoundController.getAllRounds)
	.post(verifyAccessToken, RoundController.createRound);

router
	.route('/:id')
	.get(verifyAccessToken, RoundController.getRound)
	.put(verifyAccessToken, RoundController.updateRound);

router
	.route('/:id/answer')
	.post(verifyAccessToken, RoundController.answerQuestion);

export default router;

