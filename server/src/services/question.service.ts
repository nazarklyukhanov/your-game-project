import db from '../db/models';
import formatError from '../utils/error.format.util';

const { Question, Category } = db;

interface CreateQuestionData {
	question: string;
	answer: string;
	points: number | string;
	category_id: number;
}

interface UpdateQuestionData {
	question?: string;
	answer?: string;
	points?: number | string;
	category_id?: number;
}

class QuestionService {
	static async getAllQuestions(categoryId: number | null = null) {
		const where = categoryId ? { category_id: categoryId } : {};
		const questions = await Question.findAll({
			where,
			include: [
				{
					model: Category,
					as: 'category',
				},
			],
			order: [['points', 'ASC'], ['createdAt', 'ASC']],
		});
		return questions;
	}

	static async getQuestionById(id: number) {
		const question = await Question.findByPk(id, {
			include: [
				{
					model: Category,
					as: 'category',
				},
			],
		});
		if (!question) {
			throw formatError('Question not found', 404);
		}
		return question;
	}

	static async createQuestion({ question, answer, points, category_id }: CreateQuestionData) {
		if (!question || !answer || !points || !category_id) {
			throw formatError('All fields are required', 400);
		}

		const category = await Category.findByPk(category_id);
		if (!category) {
			throw formatError('Category not found', 404);
		}

		const createdQuestion = await Question.create({
			question,
			answer,
			points: parseInt(String(points), 10),
			category_id,
		});

		return await this.getQuestionById(createdQuestion.id);
	}

	static async updateQuestion(id: number, { question, answer, points, category_id }: UpdateQuestionData) {
		const existingQuestion = await Question.findByPk(id);
		if (!existingQuestion) {
			throw formatError('Question not found', 404);
		}

		if (category_id) {
			const category = await Category.findByPk(category_id);
			if (!category) {
				throw formatError('Category not found', 404);
			}
		}

		const updateData: any = {};
		if (question !== undefined) updateData.question = question;
		if (answer !== undefined) updateData.answer = answer;
		if (points !== undefined) updateData.points = parseInt(String(points), 10);
		if (category_id !== undefined) updateData.category_id = category_id;

		await Question.update(updateData, { where: { id } });

		return await this.getQuestionById(id);
	}

	static async deleteQuestion(id: number) {
		const question = await Question.findByPk(id);
		if (!question) {
			throw formatError('Question not found', 404);
		}
		await Question.destroy({ where: { id } });
	}
}

export default QuestionService;

