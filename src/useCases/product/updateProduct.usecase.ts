import { ProductRepository } from '@/repositories/product.repository';
import { AppError } from '@/errors/AppError';
import { ProductEntity } from '@/entities/product.entity';

interface UpdateProductData {
  title?: string;
  description?: string;
  categoryId?: number;
  status?: 'available' | 'unavailable';
}

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: number, data: UpdateProductData) {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const updatedProduct = await this.productRepository.updateProduct(
      new ProductEntity({
        ...product,
        ...data
      })
    );

    return updatedProduct;
  }
} 