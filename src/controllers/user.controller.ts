import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '@/useCases/user.usecase';
import { UserRole } from '@/enums/user-role';
import { AppError } from '@/@errors/AppError';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const validationError = this.validateRequest(req.body);
      if (validationError) {
        throw new AppError(validationError, 422);
      }

      const user = await this.userUseCase.createUser(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      next(error);
    }
  }

  private validateRequest(data: any): string | null {
    const { username, password, cpf, cnpj, role, name } = data;

    if (!username || !password || !name) {
      return 'Username, password, and name are required';
    }

    if (!Object.values(UserRole).includes(role)) {
      return 'Invalid role';
    }

    const roleValidations: Record<UserRole, string> = {
      [UserRole.DONOR]: !cnpj ? 'CNPJ is required for Donor role' : '',
      [UserRole.ONG]: !cnpj ? 'CNPJ is required for ONG role' : '',
      [UserRole.TRANSPORTER]: !cpf && !cnpj ? 'CPF or CNPJ is required for Transporter role' : '',
    };

    return roleValidations[role as UserRole] || null;
  }
}
