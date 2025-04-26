import { Measure } from '@/enums/measure.enum';
import { IProduct } from '@/interfaces/IProduct';

export class ProductEntity {
  id?: number;
  donorId: number;
  categoryId: number;
  title: string;
  description?: string;
  quantity: number;
  unavailableQuantity: number;
  measure: Measure;
  registeredAt?: Date;

  constructor(product: IProduct) {
    this.id = product.id;
    this.donorId = product.donorId;
    this.categoryId = product.categoryId;
    this.title = product.title;
    this.description = product.description;
    this.quantity = product.quantity;
    this.unavailableQuantity = product.unavailableQuantity || 0;
    this.measure = product.measure;
    this.registeredAt = product.registeredAt;
  }

  get availableQuantity(): number {
    return this.quantity - this.unavailableQuantity;
  }
}
