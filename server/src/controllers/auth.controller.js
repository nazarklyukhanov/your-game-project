const AuthService = require('../services/auth.service');

const jwt = require('jsonwebtoken');
const generateJWTTokens = require('../utils/jwt.generate.util');
const cookieConfig = require('../config/cookie.config');

const formatResponse = require('../utils/response.format.util');

class AuthController {
	static async refreshTokens(req, res, next) {
		try {
			const { user } = jwt.verify(req.cookies.refreshToken, process.env.SECRET_REFRESH_TOKEN);
			const { accessToken, refreshToken } = generateJWTTokens({ user });

			res
				.status(200)
				.cookie('refreshToken', refreshToken, cookieConfig)
				.json(formatResponse(200, 'User session successfully extended', { user, accessToken }));
		} catch (error) {
			res.clearCookie('refreshToken');
			next(error);
		}
	}

	static async signUp(req, res, next) {
		try {
			const { user, accessToken, refreshToken } = await AuthService.signUp(req.body);

			res
				.status(201)
				.cookie('refreshToken', refreshToken, cookieConfig)
				.json(formatResponse(201, 'Registration successfully completed', { user, accessToken }));
		} catch (error) {
			next(error);
		}
	}

	static async signIn(req, res, next) {
		try {
			const { user, accessToken, refreshToken } = await AuthService.signIn(req.body);
			res
				.status(200)
				.cookie('refreshToken', refreshToken, cookieConfig)
				.json(formatResponse(200, 'Authorization successfully completed', { user, accessToken }));
		} catch (error) {
			next(error);
		}
	}

	static async signOut(req, res, next) {
		try {
			res.clearCookie('refreshToken').sendStatus(200);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = AuthController;
