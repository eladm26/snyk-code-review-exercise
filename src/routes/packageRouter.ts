import { Router } from 'express';
import rateLimiter from 'express-rate-limit';
import { getPackage } from '../controllers/package';

const router = Router();

const apiLimiter = rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 10000,
    message: {msg: 'IP rate limit exceeded, retry in 15 min'}
});

router.route('/:name/:version').get(apiLimiter, getPackage);

export default router;