import { RequestHandler } from 'express';
import { NextFunction } from 'express-serve-static-core';
import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';

// express v < 5.0.0 does not support try-catch of async handlers
export const asyncHandler =
  (requestHandler: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(requestHandler(req, res, next)).catch(next);
  };

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const msg = err.message || 'something went wrong, try again later';
    res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;
