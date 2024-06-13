import express from 'express';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';

import IndexRouter from '../routes/index.route';

const app = express();

/* Middleware stack */
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Initialize Routing */
app.use(IndexRouter);

export default app;
