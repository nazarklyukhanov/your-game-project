import db from '../db/models';
import formatError from '../utils/error.format.util';

const { Round, Question, User, Category } = db;

interface CreateRoundData {
	question_id: number;
	user_id: number;
	score?: number;
	status?: boolean;
}

interface UpdateRoundData {
	score?: number;
	status?: boolean;
}

interface AnswerQuestionResponse {
	isCorrect: boolean;
	score: number;
	correctAnswer: string;
	round: any;
}

class RoundService {
	static async getAllRounds(userId: number | null = null) {
		const where = userId ? { user_id: userId } : {};
		const rounds = await Round.findAll({
			where,
			include: [
				{
					model: Question,
					as: 'question',
					include: [
						{
							model: Category,
							as: 'category',
						},
					],
				},
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'email'],
				},
			],
			order: [['createdAt', 'DESC']],
		});
		return rounds;
	}

	static async getRoundById(id: number) {
		const round = await Round.findByPk(id, {
			include: [
				{
					model: Question,
					as: 'question',
					include: [
						{
							model: Category,
							as: 'category',
						},
					],
				},
				{
					model: User,
					as: 'user',
					attributes: ['id', 'name', 'email'],
				},
			],
		});
		if (!round) {
			throw formatError('Round not found', 404);
		}
		return round;
	}

	static async createRound({ question_id, user_id, score = 0, status = false }: CreateRoundData) {
		const question = await Question.findByPk(question_id);
		if (!question) {
			throw formatError('Question not found', 404);
		}

		const round = await Round.create({
			question_id,
			user_id,
			score,
			status,
		});

		return await this.getRoundById(round.id);
	}

	static async updateRound(id: number, { score, status }: UpdateRoundData) {
		const round = await Round.findByPk(id);
		if (!round) {
			throw formatError('Round not found', 404);
		}

		const updateData: any = {};
		if (score !== undefined) updateData.score = score;
		if (status !== undefined) updateData.status = status;

		await Round.update(updateData, { where: { id } });

		return await this.getRoundById(id);
	}

	static async answerQuestion(roundId: number, userAnswer: string): Promise<AnswerQuestionResponse> {
		const round = await Round.findByPk(roundId, {
			include: [
				{
					model: Question,
					as: 'question',
				},
			],
		});

		if (!round) {
			throw formatError('Round not found', 404);
		}

		const roundData = round.get({ plain: true }) as any;
		const question = roundData.question as any;
		const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim();
		const score = isCorrect ? question.points : 0;

		await Round.update(
			{
				score,
				status: isCorrect,
			},
			{ where: { id: roundId } },
		);

		return {
			isCorrect,
			score,
			correctAnswer: question.answer,
			round: await this.getRoundById(roundId),
		};
	}
}

export default RoundService;

