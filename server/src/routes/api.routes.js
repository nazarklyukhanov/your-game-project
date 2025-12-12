const router = require('express').Router();

const authRouter = require('./auth.route');
const userRouter = require('./user.routes');
const taskRouter = require('./task.routes');

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);

module.exports = router;
