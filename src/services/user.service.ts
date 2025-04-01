import bcrypt from 'bcrypt';
import { IUserRepository } from '@/repositories/user.repository';
import { IDonorRepository } from '@/repositories/donor.repository';
import { ITransporterRepository } from '@/repositories/transporter.repository';
import { IOngRepository } from '@/repositories/ong.repository';
import { CreateUserDTO } from '@/dtos/createUserDto';
import UserEntity from '@/entities/user.entity';
import DonorEntity from '@/entities/donor.entity';
import TransporterEntity from '@/entities/transporter.entity';
import OngEntity from '@/entities/ong.entity';
import { AppError } from '@/@errors/AppError';
import { UserRole } from '@/enums/user-role';

export class UserService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly donorRepository: IDonorRepository,
    private readonly transporterRepository: ITransporterRepository,
    private readonly ongRepository: IOngRepository,
  ) {}

  async register(data: CreateUserDTO) {
    if (await this.userRepository.findUser(data.username)) {
      throw new AppError('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.createUser(data, hashedPassword);

    if (!newUser?.id) {
      throw new AppError('Error creating user', 500);
    }

    const userId = newUser.id as number;

    return await this.createUserRoleEntity(data, userId);
  }

  private async createUser(data: CreateUserDTO, password: string) {
    const user = new UserEntity({
      username: data.username,
      password,
      role: data.role,
    });

    const createdUser = await this.userRepository.createUser(user);
    if (!createdUser?.id) {
      throw new AppError('Error creating user', 500);
    }
    return createdUser;
  }

  private async createUserRoleEntity(data: CreateUserDTO, userId: number) {
    switch (data.role) {
      case UserRole.DONOR:
        return this.createDonor(data, userId);
      case UserRole.TRANSPORTER:
        return this.createTransporter(data, userId);
      case UserRole.ONG:
        return this.createOng(data, userId);
      default:
        return true;
    }
  }

  private async createDonor(data: CreateUserDTO, userId: number) {
    if (!data.cnpj) {
      throw new AppError('CNPJ is required for Donor role', 422);
    }

    const donor = new DonorEntity({ cnpj: data.cnpj, name: data.name, userId });
    return this.donorRepository.createDonor(donor);
  }

  private async createTransporter(data: CreateUserDTO, userId: number) {
    if (!data.cpf && !data.cnpj) {
      throw new AppError('CPF or CNPJ is required for Transporter role', 422);
    }
    if (!data.measure || !data.capacity) {
      throw new AppError('Measure and capacity are required for Transporter role', 422);
    }

    const transporter = new TransporterEntity({
      cpf: data.cpf,
      cnpj: data.cnpj,
      name: data.name,
      userId,
      measure: data.measure,
      capacity: data.capacity,
    });

    return this.transporterRepository.createTransporter(transporter);
  }

  private async createOng(data: CreateUserDTO, userId: number) {
    if (!data.cnpj) {
      throw new AppError('CNPJ is required for ONG role', 422);
    }

    const ong = new OngEntity({ cnpj: data.cnpj, name: data.name, userId });
    return this.ongRepository.createOng(ong);
  }
}
