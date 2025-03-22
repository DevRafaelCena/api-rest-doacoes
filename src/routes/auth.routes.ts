import { Router } from 'express';
import { AuthUseCase } from '@/useCases/auth.usecase';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth.service';
import { UserRepository } from '@/repositories/user.repository';
import knex from '@/config/database';

export const authRouter = Router();

// Injeção de dependências
const userRepository = new UserRepository(knex);
const authService = new AuthService(userRepository);
const authUseCase = new AuthUseCase(authService);
const authController = new AuthController(authUseCase);

authRouter.post('/login', (req, res) => authController.login(req, res));
//authRouter.post('/refresh-token', (req, res) => authController.refreshToken(req, res));
