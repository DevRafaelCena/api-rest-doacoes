import { AuthService } from '@/services/auth.service';

export class AuthUseCase {
  constructor(private readonly authService: AuthService) {}

  async executeLogin(username: string, password: string) {
    return this.authService.login(username, password);
  }

  /* async executeRefreshToken(userId: number) {
    return this.authService.refreshToken(userId);
  } */
}
