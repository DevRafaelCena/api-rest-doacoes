import bcrypt from 'bcrypt';
import { IUserRepository } from '@/repositories/user.repository';
import { generateAccessToken, generateRefreshToken } from '@/config/jwt';

export class AuthService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ token: string; refreshToken: string }> {
    const user = await this.userRepository.findUser(username);

    if (!user || !user.id) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    let userInfo;
    switch (user.role) {
      case 'donor':
        userInfo = await this.userRepository.findDonorInfo(user.id);
        break;
      case 'ong':
        userInfo = await this.userRepository.findOngInfo(user.id);
        break;
      case 'transporter':
        userInfo = await this.userRepository.findTransporterInfo(user.id);
        break;
      default:
        throw new Error('Invalid user role');
    }

    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      ...userInfo,
    };

    const token = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(user.id);

    return {
      token,
      refreshToken,
    };
  }

  async getUserInfo(userId: number) {
    const user = await this.userRepository.findUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    let userInfo;

    console.log(user);

    switch (user.role) {
      case 'donor':
        userInfo = await this.userRepository.findDonorInfo(userId);
        break;
      case 'ong':
        userInfo = await this.userRepository.findOngInfo(userId);
        break;
      case 'transporter':
        userInfo = await this.userRepository.findTransporterInfo(userId);
        break;
      default:
        throw new Error('Invalid user role');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      ...userInfo,
    };
  }
}
