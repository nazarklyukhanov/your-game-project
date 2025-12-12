import { Model, DataTypes, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { UserAttributes, UserCreationAttributes, UserInstance } from '../../types';

export default (sequelize: Sequelize): typeof Model<UserAttributes, UserCreationAttributes> => {
	class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
		declare id: number;
		declare name: string;
		declare email: string;
		declare password: string;
		declare readonly createdAt: Date;
		declare readonly updatedAt: Date;

		static associate(models: any): void {
			this.hasMany(models.Round, { foreignKey: 'user_id', as: 'rounds' });
		}

		static validateEmail(email: string): boolean {
			const emailPattern = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
			return emailPattern.test(email);
		}

		static validatePassword(password: string): boolean {
			const hasUpperCase = /[A-Z]/;
			const hasLowerCase = /[a-z]/;
			const hasNumbers = /\d/;
			const hasSpecialCharacters = /[!@#$%^&*()-,.?":{}|<>]/;
			const isValidLength = password.length >= 8;

			if (
				!hasUpperCase.test(password) ||
				!hasLowerCase.test(password) ||
				!hasNumbers.test(password) ||
				!hasSpecialCharacters.test(password) ||
				!isValidLength
			) {
				return false;
			}

			return true;
		}

		static validateSignUpData({ name, email, password }: { name: string; email: string; password: string }): { isValid: boolean; error: string | null } {
			if (!name || typeof name !== 'string' || name.trim().length === 0) {
				return {
					isValid: false,
					error: 'Username field should not be empty',
				};
			}

			if (
				!email ||
				typeof email !== 'string' ||
				email.trim().length === 0 ||
				!this.validateEmail(email)
			) {
				return {
					isValid: false,
					error: 'Email must be valid',
				};
			}

			if (
				!password ||
				typeof password !== 'string' ||
				password.trim().length === 0 ||
				!this.validatePassword(password)
			) {
				return {
					isValid: false,
					error:
						'Password should not be empty, must contain one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long',
				};
			}

			return {
				isValid: true,
				error: null,
			};
		}

		static validateSignInData({ email, password }: { email: string; password: string }): { isValid: boolean; error: string | null } {
			if (!email || typeof email !== 'string' || email.trim().length === 0) {
				return {
					isValid: false,
					error: 'Email should not be empty',
				};
			}

			if (!password || typeof password !== 'string' || password.trim().length === 0) {
				return {
					isValid: false,
					error: 'Password should not be empty',
				};
			}

			return {
				isValid: true,
				error: null,
			};
		}
	}

	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			hooks: {
				beforeCreate: async (user: User) => {
					user.name = user.name.trim();
					user.email = user.email.trim().toLowerCase();
					user.password = await bcrypt.hash(user.password, 10);
				},
			},
			modelName: 'User',
		},
	);

	return User;
};

