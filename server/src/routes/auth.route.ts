import { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router = Router();

router
	.get('/', AuthController.refreshTokens)
	.post('/signUp', AuthController.signUp)
	.post('/signIn', AuthController.signIn)
	.delete('/signOut', AuthController.signOut);

export default router;

