import { Router } from 'express';

import '../middlewares/passport.config';
import authRouter from './auth.route';

const indexRouter = Router();

indexRouter.use('/auth', authRouter);

export default indexRouter;
