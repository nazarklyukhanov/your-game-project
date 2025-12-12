const { User } = require('../db/models');

const generateJWTTokens = require('../utils/jwt.generate.util');
const bcrypt = require('bcrypt');

const formatError = require('../utils/error.format.util');

class AuthService {
	static async signUp({ name, email, password }) {
		const { isValid, error } = User.validateSignUpData({ name, email, password });
		console.log({ name, email, password });

		if (!isValid) {
			formatError(error.message, 400);
		}

		const existingUser = await User.findOne({ where: { email: email.toLowerCase().trim() } });
		if (existingUser) {
			formatError('User with this email already exists', 400);
		}

		const user = await User.create({ name, email, password });
		const { accessToken, refreshToken } = generateJWTTokens({ user });
		return { user, accessToken, refreshToken };
	}

	static async signIn({ email, password }) {
		const { isValid, error } = User.validateSignInData({ email, password });
		if (!isValid) formatError(error.message, 400);

		const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });
		if (!user) {
			formatError('User with this email does not exists', 400);
		}

		const validPassword = bcrypt.compare(password, user.password);
		if (!validPassword) {
			formatError('Invalid password', 400);
		}

		const { accessToken, refreshToken } = generateJWTTokens({ user });
		return { user, accessToken, refreshToken };
	}
}

module.exports = AuthService;
