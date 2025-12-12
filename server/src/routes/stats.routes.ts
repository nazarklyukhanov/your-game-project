import { Router } from 'express';
import { verifyAccessToken } from '../middleware/token.verify.middleware';
import StatsController from '../controllers/stats.controller';

const router = Router();

router
	.route('/')
	.get(verifyAccessToken, StatsController.getAllUsersStats);

router
	.route('/:userId')
	.get(verifyAccessToken, StatsController.getUserStats);

export default router;

