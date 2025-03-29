import { NextFunction, Request, Response } from 'express';
import { AddressUseCase } from '@/useCases/address.usecase';

export class AdressController {
  constructor(private readonly addressUseCase: AddressUseCase) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const address = await this.addressUseCase.createOrUpdateAddress(req.body);
      return res.status(201).json(address);
    } catch (error: any) {
      next(error);
    }
  }
}
