import { StatusCodes } from 'http-status-codes';

import packageRouter from './routes/packageRouter';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

import express from 'express';

import morgan from "morgan"

export function createApp(): express.Express {
  const app = express();

  app.use(morgan('tiny'));

  app.use(express.json());

  app.use('/api/v1/packages', packageRouter);

  app.use('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' });
  });

  app.use(errorHandlerMiddleware);

  return app;
}
