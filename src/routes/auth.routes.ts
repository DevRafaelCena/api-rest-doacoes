import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { UserRepository } from '@/repositories/user.repository';
import { authenticateToken } from '@/middlewares/auth.middleware';
import knex from '@/config/database';

export const authRouter = Router();

// Injeção de dependências
const userRepository = new UserRepository(knex);
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post('/login', (req, res) => authController.login(req, res));
authRouter.get('/me', authenticateToken, (req: any, res) => authController.getUserInfo(req, res));
//authRouter.post('/refresh-token', (req, res) => authController.refreshToken(req, res));
