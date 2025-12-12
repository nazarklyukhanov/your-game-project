import db from '../db/models';
import generateJWTTokens from '../utils/jwt.generate.util';
import bcrypt from 'bcrypt';
import formatError from '../utils/error.format.util';

const { User } = db;

interface SignUpData {
	name: string;
	email: string;
	password: string;
}

interface SignInData {
	email: string;
	password: string;
}

interface AuthResponse {
	user: {
		id: number;
		name: string;
		email: string;
	};
	accessToken: string;
	refreshToken: string;
}

class AuthService {
	static async signUp({ name, email, password }: SignUpData): Promise<AuthResponse> {
		const { isValid, error } = (User as any).validateSignUpData({ name, email, password });

		if (!isValid) {
			throw formatError(error as string, 400);
		}

		const existingUser = await User.findOne({ where: { email: email.toLowerCase().trim() } });
		if (existingUser) {
			throw formatError('User with this email already exists', 400);
		}

		const user = await User.create({ name, email, password });
		const rawUser = user.get({ plain: true }) as any;
		delete rawUser.password;
		const { accessToken, refreshToken } = generateJWTTokens({ user: rawUser });
		return { user: rawUser, accessToken, refreshToken };
	}

	static async signIn({ email, password }: SignInData): Promise<AuthResponse> {
		const { isValid, error } = (User as any).validateSignInData({ email, password });
		if (!isValid) {
			throw formatError(error as string, 400);
		}

		const user = await User.findOne({ where: { email: email.toLowerCase().trim() } });
		if (!user) {
			throw formatError('User with this email does not exist', 400);
		}

		const userData = user.get({ plain: true }) as any;
		const validPassword = await bcrypt.compare(password, userData.password);
		if (!validPassword) {
			throw formatError('Invalid password', 400);
		}

		const rawUser = userData;
		delete rawUser.password;
		const { accessToken, refreshToken } = generateJWTTokens({ user: rawUser });
		return { user: rawUser, accessToken, refreshToken };
	}
}

export default AuthService;

