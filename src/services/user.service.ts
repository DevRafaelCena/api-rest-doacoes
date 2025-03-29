import bcrypt from 'bcrypt';
import { IUserRepository } from '@/repositories/user.repository';
import { IDonorRepository } from '@/repositories/donor.repository';
import { CreateUserDTO } from '@/dtos/createUserDto';
import UserEntity from '@/entities/user.entity';
import { AppError } from '@/@errors/AppError';
import { UserRole } from '@/enums/user-role';
import DonorEntity from '@/entities/donor.entity';

export class UserService {
  private userRepository: IUserRepository;
  private donorRepository: IDonorRepository;

  constructor(userRepository: IUserRepository, donorRepository: IDonorRepository) {
    this.userRepository = userRepository;
    this.donorRepository = donorRepository;
  }

  async register(data: CreateUserDTO) {
    const user = await this.userRepository.findUser(data.username);

    if (user) {
      throw new AppError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = new UserEntity({
      username: data?.username,
      password: hashedPassword,
      role: data.role,
    });

    const createdUser = await this.userRepository.createUser(newUser);

    if (!createdUser || !createdUser.id) {
      throw new AppError('Error creating user', 500);
    }

    if (data.role === UserRole.DONOR) {
      if (!data.cnpj) {
        throw new AppError('CNPJ is required for Donor role', 422);
      }

      const donor = new DonorEntity({
        cnpj: data.cnpj,
        name: data.name,
        userId: createdUser.id,
      });

      const donorCreated = await this.donorRepository.createDonor(donor);

      return donorCreated;
    }

    console.log('createdUser', createdUser);

    return true;
  }
}
