const router = require('express').Router();

const { verifyAccessToken } = require('../middleware/token.verify.middleware');

const TaskController = require('../controllers/task.controller');

router
	.route('/')
	.get(verifyAccessToken, TaskController.getAllTasks)
	.post(verifyAccessToken, TaskController.createTask);

// router
// 	.route('/:id')
// 	.get(verifyAccessToken, TaskController.getTask)
// 	.put(verifyAccessToken, TaskController.updateTask)
// 	.delete(verifyAccessToken, TaskController.deleteTask);

module.exports = router;
