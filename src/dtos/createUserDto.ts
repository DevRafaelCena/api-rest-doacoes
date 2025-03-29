import { UserRole } from '@/enums/user-role';

export interface CreateUserDTO {
  username: string;
  password: string;
  cnpj?: string;
  cpf?: string;
  name: string;
  role: UserRole;
}
