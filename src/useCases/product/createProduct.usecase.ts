import { IProductRepository } from '@/repositories/product.repository';
import { ProductEntity } from '@/entities/product.entity';
import { CreateProductDTO } from '@/dtos/createProductDto';

export class CreateProductUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(data: CreateProductDTO): Promise<ProductEntity> {
    const product = new ProductEntity({
      ...data,
      registeredAt: new Date(),
      unavailableQuantity: 0,
    });

    return await this.productRepository.createProduct(product);
  }
}
