import { Router } from 'express';

const indexRouter = Router();

indexRouter.use((req, res, next) => res.status(200).send("Ok!"));

export default indexRouter;
