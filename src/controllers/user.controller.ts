import { NextFunction, Request, Response } from 'express';
import { UserUseCase } from '@/useCases/user.usecase';
import { UserRole } from '@/enums/user-role';
import { AppError } from '@/@errors/AppError';
import { z } from 'zod';
import { CreateAddressDTO } from '@/dtos/createAddressDto';
import { CreateUserDTO } from '@/dtos/createUserDto';

export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const createUserSchema = z.object({
        username: z.string().min(3, 'Username must have at least 3 characters'),
        password: z.string().min(6, 'Password must have at least 6 characters'),
        name: z.string().min(1, 'Name is required'),
        cnpj: z.string().optional(),
        cpf: z.string().optional(),
        role: z.string(),
      });

      const parsedData = createUserSchema.parse(req.body);

      const validationError = this.validateRequest(req.body);
      if (validationError) {
        throw new AppError(validationError, 422);
      }

      const dataUser = parsedData as CreateUserDTO;

      const user = await this.userUseCase.createUser(dataUser);
      return res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ message: error.errors });
      }

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
