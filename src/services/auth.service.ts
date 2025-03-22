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

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid username or password');
    }

    const token = generateAccessToken({ id: user.id, username: user.username });
    const refreshToken = generateRefreshToken(user.id);

    return { token, refreshToken };
  }
}
