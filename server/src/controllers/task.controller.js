const TaskService = require('../services/task.service');
const formatResponse = require('../utils/response.format.util');

class TaskController {
	static async getAllTasks(req, res, next) {
		try {
			const tasks = await TaskService.getAllTasks();
			res.status(200).json(formatResponse(200, 'All tasks', tasks));
		} catch (error) {
			next(error);
		}
	}

	static async createTask(req, res, next) {
		try {
            const task = await TaskService.createTask(req.body)
		} catch (error) {
			next(error);
		}
	}
}

module.exports = TaskController;
