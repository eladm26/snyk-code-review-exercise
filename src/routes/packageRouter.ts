import { Router } from 'express';
import rateLimiter from 'express-rate-limit';
import { getPackage } from '../controllers/package';
import { validatePackagesParams } from '../middleware/validationMiddleware';

const router = Router();

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: { msg: 'IP rate limit exceeded, retry in 15 min' },
});

router
  .route('/:name/:version')
  .get(apiLimiter, validatePackagesParams, getPackage);

export default router;
