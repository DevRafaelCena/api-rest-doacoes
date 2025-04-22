import { z } from 'zod';

export const requestDonationSchema = z.object({
  productId: z.number().int().positive('ID do produto deve ser um número positivo'),
  ongId: z.number().int().positive('ID da ONG deve ser um número positivo'),
});

export type RequestDonationDTO = z.infer<typeof requestDonationSchema>; 