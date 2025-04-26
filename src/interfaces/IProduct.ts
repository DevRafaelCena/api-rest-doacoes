import { Measure } from '@/enums/measure.enum';

export interface IProduct {
  id?: number;
  donorId: number;
  categoryId: number;
  title: string;
  description?: string;
  quantity: number;
  unavailableQuantity: number;
  measure: Measure;
  registeredAt?: Date;
  available?: number;
}
