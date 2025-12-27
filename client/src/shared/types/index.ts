export type ServerResponseType<T = any> = {
	statusCode: number;
	message: string;
	data: T | null;
	error: any | null;
};

