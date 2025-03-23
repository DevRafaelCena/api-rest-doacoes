import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/config/jwt';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    const decoded = verifyToken(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
