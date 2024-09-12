import { param, validationResult } from 'express-validator';
import { BadRequestError } from '../errors/customErrors';
import { NextFunction, Request, Response } from 'express';

export const validatePackagesParams = [
  param('name')
    .exists({ checkFalsy: true })
    .withMessage('Package name is required'),
  param('version')
    .exists()
    .matches(
      /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z\-\.]+))?(?:\+([0-9A-Za-z\-\.]+))?$/,
    )
    .withMessage('invalid package semver version'),
  (req: Request, _: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages: string[] = errors.array().map((error) => error.msg);
      throw new BadRequestError(errorMessages[0] ?? '');
    }
    return next();
  },
];
