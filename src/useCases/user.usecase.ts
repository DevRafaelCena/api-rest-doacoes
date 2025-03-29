import { CreateUserDTO } from '@/dtos/createUserDto';
import { UserService } from '@/services/user.service';

export class UserUseCase {
  constructor(private readonly userService: UserService) {}

  async createUser(data: CreateUserDTO) {
    return this.userService.register(data);
  }
}
