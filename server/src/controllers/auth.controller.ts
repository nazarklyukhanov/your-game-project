import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../services/auth.service';
import generateJWTTokens from '../utils/jwt.generate.util';
import cookieConfig from '../config/cookie.config';
import formatResponse from '../utils/response.format.util';
import { JWTPayload } from '../types';

class AuthController {
	static async refreshTokens(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const { refreshToken } = req.cookies;
			if (!refreshToken) {
				res.clearCookie('refreshToken');
				return next(new Error('No refresh token'));
			}

			const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN as string) as JWTPayload;
			const { accessToken, refreshToken: newRefreshToken } = generateJWTTokens({ user: decoded.user });

			res
				.status(200)
				.cookie('refreshToken', newRefreshToken, cookieConfig)
				.json(formatResponse(200, 'User session successfully extended', { user: decoded.user, accessToken }));
		} catch (error) {
			res.clearCookie('refreshToken');
			next(error);
		}
	}

	static async signUp(req: Request, res: Response, next: NextFunction): Promise<void> {
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

	static async signIn(req: Request, res: Response, next: NextFunction): Promise<void> {
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

	static async signOut(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			res.clearCookie('refreshToken').sendStatus(200);
		} catch (error) {
			next(error);
		}
	}
}

export default AuthController;

