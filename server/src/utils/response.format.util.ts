import { ApiResponse } from '../types';

/**
 * Собирает единый формат ответа от сервера.
 * @param statusCode - статус ответа HTTP.
 * @param message - текстовое сообщение, описывающее статус ответа.
 * @param data - данные, которые сервер возвращает клиенту.
 * @param error - объект с ошибкой, если она возникла
 * @returns объект ответа
 */
export default <T = any>(statusCode: number, message: string, data: T | null = null, error: any | null = null): ApiResponse<T> => {
	return {
		statusCode,
		message,
		data,
		error,
	};
};

