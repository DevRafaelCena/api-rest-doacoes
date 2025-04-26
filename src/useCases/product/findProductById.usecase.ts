import { IProductRepository } from '@/repositories/product.repository';
import { ProductEntity } from '@/entities/product.entity';
import { AppError } from '@/@errors/AppError';

export class FindProductByIdUseCase {
  constructor(private readonly productRepository: IProductRepository) {}

  async execute(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    return product;
  }
}
