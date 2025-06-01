import { IDonationRepository } from '@/repositories/donation.repository';
import { IProductRepository } from '@/repositories/product.repository';
import { AppError } from '@/errors/AppError';

export class AcceptDonationUseCase {
  constructor(
    private donationRepository: IDonationRepository,
    private productRepository: IProductRepository
  ) {}

  async execute(donationId: number) {
    const donation = await this.donationRepository.findDonationById(donationId);

    if (!donation) {
      throw new AppError('Solicitação de doação não encontrada', 404);
    }

    if (donation.completed) {
      throw new AppError('Esta solicitação já foi finalizada', 400);
    }

    const product = await this.productRepository.findProductById(donation.productId);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    const availableQuantity = product.quantity - (product.unavailableQuantity || 0);

    if (availableQuantity < donation.quantity) {
      throw new AppError('Quantidade solicitada indisponível', 400);
    }

    await this.productRepository.updateUnavailableQuantity(donation.productId, donation.quantity);
    
    const updatedDonation = await this.donationRepository.updateDonation({
      ...donation,
      acceptedAt: new Date()
    });

    return updatedDonation;
  }
} 