import { Request, Response, NextFunction } from 'express';
import formatResponse from '../utils/response.format.util';

interface ErrorWithStatus extends Error {
	status?: number;
}

export default (error: ErrorWithStatus, req: Request, res: Response, next: NextFunction): void => {
	const status = error.status || 500;
	const message = error.message || 'Internal Server Error';

	res.status(status).json(formatResponse(status, message, null, { error: message }));
};

