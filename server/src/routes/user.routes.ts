import { Router } from 'express';
import { verifyAccessToken } from '../middleware/token.verify.middleware';
import UserController from '../controllers/user.controller';

const router = Router();

router.route('/').get(verifyAccessToken, UserController.getAllUsers);

router
	.route('/:id')
	.get(verifyAccessToken, UserController.getUser)
	.put(verifyAccessToken, UserController.updateUser)
	.delete(verifyAccessToken, UserController.deleteUser);

export default router;

