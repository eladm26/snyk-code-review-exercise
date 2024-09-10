import { StatusCodes } from 'http-status-codes';

import packageRouter from './routes/packageRouter';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';

import express from 'express';

export function createApp(): express.Express {
  const app = express();

  app.use(express.json());

  app.use('/api/v1/packages', packageRouter);

  app.use('/api/v1/hello', (req, res) => {
    console.log('hello');
    res.status(StatusCodes.OK).json({});
  });

  app.use('*', (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' });
  });

  app.use(errorHandlerMiddleware);

  return app;
}
