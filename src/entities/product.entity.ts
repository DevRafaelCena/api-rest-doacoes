import { IProduct } from '@/interfaces/IProduct';
import { Measure } from '@/enums/measure.enum';

export default class ProductEntity implements IProduct {
  id?: number;
  donorId: number;
  categoryId: number;
  title: string;
  description?: string;
  quantity: number;
  measure: Measure;
  registeredAt?: Date;

  constructor({
    id,
    donorId,
    categoryId,
    title,
    description,
    quantity,
    measure,
    registeredAt
  }: IProduct) {
    this.id = id;
    this.donorId = donorId;
    this.categoryId = categoryId;
    this.title = title;
    this.description = description;
    this.quantity = quantity;
    this.measure = measure;
    this.registeredAt = registeredAt || new Date();
  }
}
