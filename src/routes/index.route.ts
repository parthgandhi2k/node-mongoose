import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';
import postRouter from './post.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);
indexRouter.use('/posts', postRouter);

export default indexRouter;
