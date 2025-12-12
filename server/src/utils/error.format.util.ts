export default (message: string, status: number): never => {
	throw Object.assign(new Error(message), { status });
};

