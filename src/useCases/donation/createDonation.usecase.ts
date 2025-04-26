import DonationEntity from '@/entities/donation.entity';
import { DonationRepository } from '@/repositories/donation.repository';
import { ProductRepository } from '@/repositories/product.repository';
import { AppError } from '@/errors/AppError';

export class CreateDonationUseCase {
  constructor(
    private donationRepository: DonationRepository,
    private productRepository: ProductRepository
  ) {}

  async execute(donation: DonationEntity): Promise<DonationEntity> {
    const product = await this.productRepository.findProductById(donation.productId);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (product.measure !== donation.measure) {
      throw new AppError('A unidade de medida da doação deve ser igual à do produto', 400);
    }

    const availableQuantity = product.quantity - product.unavailableQuantity;
    
    if (donation.quantity > availableQuantity) {
      throw new AppError(`Quantidade solicitada (${donation.quantity}) é maior que a quantidade disponível (${availableQuantity})`, 400);
    }

    // Atualiza a quantidade indisponível do produto
    await this.productRepository.updateUnavailableQuantity(product.id!, donation.quantity);

    // Cria a doação
    return this.donationRepository.createDonation(donation);
  }
}
