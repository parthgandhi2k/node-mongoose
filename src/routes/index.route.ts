import { Router } from 'express';

import userRouter from './user.route';
import authRouter from './auth.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);
indexRouter.use('/users', userRouter);

export default indexRouter;
