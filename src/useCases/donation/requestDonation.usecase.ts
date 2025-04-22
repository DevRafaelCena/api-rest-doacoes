import { IProductRepository } from '@/repositories/product.repository';
import { IDonationRepository } from '@/repositories/donation.repository';
import DonationEntity from '@/entities/donation.entity';
import { RequestDonationDTO } from '@/dtos/requestDonationDto';
import { AppError } from '@/@errors/AppError';

export class RequestDonationUseCase {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly donationRepository: IDonationRepository
  ) {}

  async execute(data: RequestDonationDTO): Promise<DonationEntity> {
    const product = await this.productRepository.findProductById(data.productId);

    if (!product) {
      throw new AppError('Produto não encontrado', 404);
    }

    if (product.quantity <= 0) {
      throw new AppError('Produto não está disponível para doação', 400);
    }

    const donation = new DonationEntity({
      productId: product.id!,
      ongId: data.ongId,
      quantity: product.quantity,
      measure: product.measure,
      completed: false
    });

    return await this.donationRepository.createDonation(donation);
  }
} 