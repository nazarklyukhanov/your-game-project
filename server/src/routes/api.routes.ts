import { Router } from 'express';

import authRouter from './auth.route';
import userRouter from './user.routes';
import roundRouter from './task.routes';
import categoryRouter from './category.routes';
import questionRouter from './question.routes';
import statsRouter from './stats.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/rounds', roundRouter);
router.use('/categories', categoryRouter);
router.use('/questions', questionRouter);
router.use('/stats', statsRouter);

export default router;

