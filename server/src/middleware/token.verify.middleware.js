const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '..', '.env') });

const jwt = require('jsonwebtoken');
const formatError = require('../utils/error.format.util');

function verifyAccessToken(req, res, next) {
	try {
		const accessToken = req.headers.authorization.split(' ')[1];
		const { user } = jwt.verify(accessToken, process.env.SECRET_ACCESS_TOKEN);
		res.locals.user = user;
		next();
	} catch {
		next(formatError('Invalid access token', 403));
	}
}

function refreshAccessToken(req, res, next) {
	try {
		const { refreshToken } = req.cookies;
		const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
		res.locals.user = user;
		next();
	} catch {
		next(formatError('Invalid refresh token', 401));
	}
}

module.exports = { verifyAccessToken, refreshAccessToken };
