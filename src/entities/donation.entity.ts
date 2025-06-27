import { IDonation } from '@/interfaces/IDonation';
import { Measure } from '@/enums/measure.enum';

export default class DonationEntity implements IDonation {
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

  constructor({
    id,
    productId,
    ongId,
    quantity,
    measure,
    invoiceUrl,
    acceptedAt,
    sentAt,
    deliveredAt,
    completed,
    transporterId,
    pickedUpAt,
    deliveredByTransporterAt
  }: IDonation & { transporterId?: number; pickedUpAt?: Date; deliveredByTransporterAt?: Date }) {
    this.id = id;
    this.productId = productId;
    this.ongId = ongId;
    this.quantity = quantity;
    this.measure = measure;
    this.invoiceUrl = invoiceUrl;
    this.acceptedAt = acceptedAt;
    this.sentAt = sentAt;
    this.deliveredAt = deliveredAt;
    this.completed = completed;
    this.transporterId = transporterId;
    this.pickedUpAt = pickedUpAt;
    this.deliveredByTransporterAt = deliveredByTransporterAt;
  } 
} 