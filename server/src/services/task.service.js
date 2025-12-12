const Task = require('../db/models');
const formatError = require('../utils/error.format.util');

class TaskService {
	static getAllTasks() {
		return Task.findAll();
	}

	static createTask({ title, status, deadline, user_id }) {
		return Task.create({ title, status, deadline, user_id });
	}
}

module.exports = TaskService;
