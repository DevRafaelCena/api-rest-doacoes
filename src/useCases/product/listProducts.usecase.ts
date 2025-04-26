import { IProductRepository } from '@/repositories/product.repository';
import { ProductEntity } from '@/entities/product.entity';

export interface ListProductsFilters {
  categoryId?: number;
  title?: string;
}

export class ListProductsUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(filters?: ListProductsFilters): Promise<ProductEntity[]> {
    return await this.productRepository.findAvailableProducts(filters);
  }
}
