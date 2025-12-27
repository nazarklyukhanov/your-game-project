import { Request, Response, NextFunction } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import formatError from '../utils/error.format.util';
import { JWTPayload } from '../types';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

export function verifyAccessToken(req: Request, res: Response, next: NextFunction): void {
	try {
		const authHeader = req.headers.authorization;
		if (!authHeader) {
			throw formatError('No authorization header', 403);
		}

		const accessToken = authHeader.split(' ')[1];
		if (!accessToken) {
			throw formatError('No access token provided', 403);
		}

		const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN as string) as JWTPayload;
		res.locals.user = decoded.user;
		next();
	} catch (error) {
		next(formatError('Invalid access token', 403));
	}
}

export function refreshAccessToken(req: Request, res: Response, next: NextFunction): void {
	try {
		const { refreshToken } = req.cookies;
		if (!refreshToken) {
			throw formatError('No refresh token provided', 401);
		}

		const decoded = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN as string) as JWTPayload;
		res.locals.user = decoded.user;
		next();
	} catch (error) {
		next(formatError('Invalid refresh token', 401));
	}
}

