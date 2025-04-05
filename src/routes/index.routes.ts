import { Router } from 'express';
import { healthRouter } from '@/routes/health.routes';
import { authRouter } from '@/routes/auth.routes';
import { userRouter } from '@/routes/user.routes';
import { productRoutes } from '@/routes/product.routes'

const router = Router();

router.use(healthRouter);
router.use(authRouter);
router.use('/user', userRouter);

router.use('/products', productRoutes);

export default router;
