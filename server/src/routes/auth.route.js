const router = require('express').Router();

const AuthController = require('../controllers/auth.controller');

router
	.get('/', AuthController.refreshTokens)
	.post('/signUp', AuthController.signUp)
	.post('/signIn', AuthController.signIn)
	.delete('/signOut', AuthController.signOut);

module.exports = router;
