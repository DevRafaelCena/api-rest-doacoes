import { z } from 'zod';
import { Measure } from '@/enums/measure.enum';

export const createProductSchema = z.object({
  donorId: z.number().int().positive('ID do doador deve ser um número positivo'),
  categoryId: z.number().int().positive('ID da categoria deve ser um número positivo'),
  title: z.string().min(3, 'O título deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  quantity: z.number().int().positive('A quantidade deve ser um número positivo'),
  measure: z.nativeEnum(Measure, {
    errorMap: () => ({ message: 'Unidade de medida inválida' })
  }),
});

export type CreateProductDTO = z.infer<typeof createProductSchema>; 