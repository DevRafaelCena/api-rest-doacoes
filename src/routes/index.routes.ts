import { Router } from 'express';
import { healthRouter } from '@/routes/health.routes';
import { authRouter } from '@/routes/auth.routes';

const router = Router();

router.use(healthRouter);
router.use(authRouter);

export default router;
