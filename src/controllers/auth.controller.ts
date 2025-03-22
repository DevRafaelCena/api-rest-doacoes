import { Request, Response } from 'express';
import { AuthUseCase } from '@/useCases/auth.usecase';

export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  async login(req: Request, res: Response) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
      }

      const tokens = await this.authUseCase.executeLogin(username, password);
      return res.status(200).json(tokens);
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  /* async refreshToken(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const accessToken = await this.authUseCase.executeRefreshToken(userId);
      return res.status(200).json({ accessToken });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  } */
}
//
