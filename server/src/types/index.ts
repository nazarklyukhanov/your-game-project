import { Model, Optional } from 'sequelize';

// User types
export interface UserAttributes {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
	validateEmail(email: string): boolean;
	validatePassword(password: string): boolean;
	validateSignUpData(data: { name: string; email: string; password: string }): { isValid: boolean; error: string | null };
	validateSignInData(data: { email: string; password: string }): { isValid: boolean; error: string | null };
}

// Category types
export interface CategoryAttributes {
	id: number;
	title: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface CategoryInstance extends Model<CategoryAttributes, CategoryCreationAttributes>, CategoryAttributes {}

// Question types
export interface QuestionAttributes {
	id: number;
	question: string;
	answer: string;
	points: number;
	category_id: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface QuestionCreationAttributes extends Optional<QuestionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface QuestionInstance extends Model<QuestionAttributes, QuestionCreationAttributes>, QuestionAttributes {}

// Round types
export interface RoundAttributes {
	id: number;
	score: number;
	status: boolean;
	question_id: number;
	user_id: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface RoundCreationAttributes extends Optional<RoundAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export interface RoundInstance extends Model<RoundAttributes, RoundCreationAttributes>, RoundAttributes {}

// JWT types
export interface JWTPayload {
	user: {
		id: number;
		name: string;
		email: string;
	};
}

// Request types
export interface AuthRequest extends Express.Request {
	body: {
		name?: string;
		email: string;
		password: string;
	};
}

export interface AuthResponse extends Express.Response {
	locals: {
		user?: {
			id: number;
			name: string;
			email: string;
		};
	};
}

// Response types
export interface ApiResponse<T = any> {
	statusCode: number;
	message: string;
	data: T | null;
	error: any | null;
}

