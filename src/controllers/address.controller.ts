import { NextFunction, Request, Response } from 'express';
import { AddressUseCase } from '@/useCases/address.usecase';
import { z } from 'zod';
import { sanitize } from '@/utils/stringSanitize';

export class AdressController {
  constructor(private readonly addressUseCase: AddressUseCase) {}

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const createAddressSchema = z.object({
        street: z.string().min(1, 'Street is required'),
        number: z.string().min(1, 'Number is required'),
        complement: z.string().optional(),
        cep: z.string(),
        city: z.string().min(1, 'City is required'),
        state: z.string().length(2, 'State must be a 2-letter abbreviation'),
        userId: z.number().int().positive('User ID must be a positive integer'),
      });

      const parsedData = createAddressSchema.parse(req.body);

      const { cep } = parsedData;

      const sanitizedCep = sanitize(cep);

      parsedData.cep = sanitizedCep;

      const address = await this.addressUseCase.createOrUpdateAddress(parsedData);

      return res.status(201).json(address);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(422).json({ message: error.errors });
      }

      next(error);
    }
  }
}
