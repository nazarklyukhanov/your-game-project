import db from '../db/models';
import formatError from '../utils/error.format.util';

const { Category, Question } = db;

interface CreateCategoryData {
	title: string;
	description: string;
}

interface UpdateCategoryData {
	title?: string;
	description?: string;
}

class CategoryService {
	static async getAllCategories() {
		const categories = await Category.findAll({
			include: [
				{
					model: Question,
					as: 'questions',
				},
			],
			order: [['createdAt', 'ASC']],
		});
		return categories;
	}

	static async getCategoryById(id: number) {
		const category = await Category.findByPk(id, {
			include: [
				{
					model: Question,
					as: 'questions',
				},
			],
		});
		if (!category) {
			throw formatError('Category not found', 404);
		}
		return category;
	}

	static async createCategory({ title, description }: CreateCategoryData) {
		if (!title || !description) {
			throw formatError('Title and description are required', 400);
		}
		const category = await Category.create({ title, description });
		return category;
	}

	static async updateCategory(id: number, { title, description }: UpdateCategoryData) {
		const category = await Category.findByPk(id);
		if (!category) {
			throw formatError('Category not found', 404);
		}

		const updateData: any = {};
		if (title !== undefined) updateData.title = title;
		if (description !== undefined) updateData.description = description;

		await Category.update(updateData, { where: { id } });
		return await Category.findByPk(id);
	}

	static async deleteCategory(id: number) {
		const category = await Category.findByPk(id);
		if (!category) {
			throw formatError('Category not found', 404);
		}
		await Category.destroy({ where: { id } });
	}
}

export default CategoryService;

