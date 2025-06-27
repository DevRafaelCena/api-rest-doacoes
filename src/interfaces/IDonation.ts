import { Measure } from '@/enums/measure.enum';

export interface IDonation {
  id?: number;
  productId: number;
  ongId: number;
  quantity: number;
  measure: Measure;
  invoiceUrl?: string;
  acceptedAt?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  completed: boolean;
  transporterId?: number;
  pickedUpAt?: Date;
  deliveredByTransporterAt?: Date;
} 