import { Router } from 'express';
import { userRouter } from './user.routes';
import { productRoutes } from './product.routes';
import { donationRoutes } from './donation.routes';

const router = Router();

// Rotas públicas
router.use('/users', userRouter);

// Rotas protegidas
router.use('/products', productRoutes);
router.use('/donations', donationRoutes);

export { router };
