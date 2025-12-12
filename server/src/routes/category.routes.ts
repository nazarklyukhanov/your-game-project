import { Router } from 'express';
import { verifyAccessToken } from '../middleware/token.verify.middleware';
import CategoryController from '../controllers/category.controller';

const router = Router();

router
	.route('/')
	.get(CategoryController.getAllCategories)
	.post(verifyAccessToken, CategoryController.createCategory);

router
	.route('/:id')
	.get(CategoryController.getCategory)
	.put(verifyAccessToken, CategoryController.updateCategory)
	.delete(verifyAccessToken, CategoryController.deleteCategory);

export default router;

