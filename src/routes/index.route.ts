import { Router } from 'express';

const IndexRouter = Router();

IndexRouter.use((req, res, next) => res.status(200).send("Ok!"));

export default IndexRouter;
