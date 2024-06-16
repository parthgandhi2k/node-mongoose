import { Router } from 'express';
import authRouter from './auth.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

export default indexRouter;
