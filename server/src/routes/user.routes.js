const router = require('express').Router();

const { verifyAccessToken } = require('../middleware/token.verify.middleware');

const UserController = require('../controllers/user.controller');

router.route('/').get(UserController.getAllUsers);

router
	.route('/:id')
	.get(UserController.getUser)
	.put(verifyAccessToken, UserController.updateUser)
	.delete(verifyAccessToken, UserController.deleteUser);

module.exports = router;
