import { UserAttributes } from './index';

declare global {
	namespace Express {
		interface Locals {
			user?: {
				id: number;
				name: string;
				email: string;
			};
		}
	}
}

export {};

