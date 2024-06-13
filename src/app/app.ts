import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';

import indexRouter from '../routes/index.route';
import { mainErrorHandler, notFoundHandler } from '../middlewares/error.middleware';

const app = express();

/* Middleware stack */
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Initialize Routing */
app.use(indexRouter);

/* Error Handling */
app.use('*', notFoundHandler);
app.use(mainErrorHandler);

export default app;
