import { Router } from 'express';

export const healthRouter = Router();

healthRouter.route('/health').get((req, res) => {
  return res.status(200).json({
    status: 'OK',
  });
});
