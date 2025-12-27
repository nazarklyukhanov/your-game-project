import path from 'path';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';
import { JWTPayload } from '../types';

dotenv.config({ path: path.resolve(__dirname, '..', '..', '.env') });

export default (payload: JWTPayload): { accessToken: string; refreshToken: string } => {
	const secretAccessToken = process.env.SECRET_ACCESS_TOKEN as string;
	const secretRefreshToken = process.env.SECRET_REFRESH_TOKEN as string;

	return {
		accessToken: jwt.sign(payload, secretAccessToken, jwtConfig.access),
		refreshToken: jwt.sign(payload, secretRefreshToken, jwtConfig.refresh),
	};
};

