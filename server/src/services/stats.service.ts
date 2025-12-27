import db from '../db/models';
import formatError from '../utils/error.format.util';

const { Round, User } = db;

interface UserStats {
	totalRounds: number;
	correctAnswers: number;
	wrongAnswers: number;
	totalScore: number;
	successRate: string;
}

interface StatsResponse {
	user: any;
	stats: UserStats;
}

class StatsService {
	static async getUserStats(userId: number): Promise<StatsResponse> {
		const user = await User.findByPk(userId, {
			attributes: ['id', 'name', 'email'],
		});

		if (!user) {
			throw formatError('User not found', 404);
		}

		const rounds = await Round.findAll({
			where: { user_id: userId },
		});

		const totalRounds = rounds.length;
		const correctAnswers = rounds.filter((round: any) => {
			const roundData = round.get({ plain: true });
			return roundData.status === true;
		}).length;
		const totalScore = rounds.reduce((sum: number, round: any) => {
			const roundData = round.get({ plain: true });
			return sum + roundData.score;
		}, 0);

		return {
			user: user.get({ plain: true }),
			stats: {
				totalRounds,
				correctAnswers,
				wrongAnswers: totalRounds - correctAnswers,
				totalScore,
				successRate: totalRounds > 0 ? ((correctAnswers / totalRounds) * 100).toFixed(2) : '0',
			},
		};
	}

	static async getAllUsersStats(): Promise<StatsResponse[]> {
		const users = await User.findAll({
			attributes: ['id', 'name', 'email'],
		});

		const statsPromises = users.map(async (user) => {
			const rounds = await Round.findAll({
				where: { user_id: user.id },
			});

			const totalRounds = rounds.length;
			const correctAnswers = rounds.filter((round: any) => {
				const roundData = round.get({ plain: true });
				return roundData.status === true;
			}).length;
			const totalScore = rounds.reduce((sum: number, round: any) => {
				const roundData = round.get({ plain: true });
				return sum + roundData.score;
			}, 0);

			return {
				user: user.get({ plain: true }),
				stats: {
					totalRounds,
					correctAnswers,
					wrongAnswers: totalRounds - correctAnswers,
					totalScore,
					successRate: totalRounds > 0 ? ((correctAnswers / totalRounds) * 100).toFixed(2) : '0',
				},
			};
		});

		const allStats = await Promise.all(statsPromises);
		return allStats.sort((a, b) => b.stats.totalScore - a.stats.totalScore);
	}
}

export default StatsService;

