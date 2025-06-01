import { IDonationRepository } from '@/repositories/donation.repository';
import { AppError } from '@/errors/AppError';

export class UpdateSentAtUseCase {
  constructor(private donationRepository: IDonationRepository) {}

  async execute(donationId: number) {
    const donation = await this.donationRepository.findDonationById(donationId);

    if (!donation) {
      throw new AppError('Solicitação de doação não encontrada', 404);
    }

    if (donation.completed) {
      throw new AppError('Esta solicitação já foi finalizada', 400);
    }

    if (!donation.acceptedAt) {
      throw new AppError('Esta solicitação ainda não foi aceita', 400);
    }

    const updatedDonation = await this.donationRepository.updateDonation({
      ...donation,
      sentAt: new Date()
    });

    return updatedDonation;
  }
} 