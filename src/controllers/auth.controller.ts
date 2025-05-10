import { Request, Response } from 'express';
import { AuthService } from '@/services/auth.service';

interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    username: string;
    role: string;
  };
}

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
      const { token, refreshToken } = await this.authService.login(username, password);
      return res.json({ token, refreshToken });
    } catch (error: any) {
      return res.status(401).json({ message: error.message });
    }
  }

  async getUserInfo(req: AuthenticatedRequest, res: Response) {
    try {
      const userId = req.user.id;
      const userInfo = await this.authService.getUserInfo(userId);
      return res.json(userInfo);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
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
