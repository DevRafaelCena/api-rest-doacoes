import { Router } from 'express';
import { healthRouter } from '@/routes/health.routes';
import { authRouter } from '@/routes/auth.routes';
import { userRouter } from '@/routes/user.routes';

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use('/user', userRouter);

export default router;
