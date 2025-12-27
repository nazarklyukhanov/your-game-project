import { Request, Response, NextFunction } from 'express';
import CategoryService from '../services/category.service';
import formatResponse from '../utils/response.format.util';

class CategoryController {
	static async getAllCategories(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categories = await CategoryService.getAllCategories();
			res.status(200).json(formatResponse(200, 'All categories retrieved', categories));
		} catch (error) {
			next(error);
		}
	}

	static async getCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categoryId = parseInt(req.params.id, 10);
			const category = await CategoryService.getCategoryById(categoryId);
			res.status(200).json(formatResponse(200, 'Category retrieved', category));
		} catch (error) {
			next(error);
		}
	}

	static async createCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const category = await CategoryService.createCategory(req.body);
			res.status(201).json(formatResponse(201, 'Category created', category));
		} catch (error) {
			next(error);
		}
	}

	static async updateCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categoryId = parseInt(req.params.id, 10);
			const category = await CategoryService.updateCategory(categoryId, req.body);
			res.status(200).json(formatResponse(200, 'Category updated', category));
		} catch (error) {
			next(error);
		}
	}

	static async deleteCategory(req: Request, res: Response, next: NextFunction): Promise<void> {
		try {
			const categoryId = parseInt(req.params.id, 10);
			await CategoryService.deleteCategory(categoryId);
			res.sendStatus(204);
		} catch (error) {
			next(error);
		}
	}
}

export default CategoryController;

