import { DonationRepository } from '@/repositories/donation.repository';
import DonationEntity from '@/entities/donation.entity';

export class CreateDonationUseCase {
  constructor(private donationRepository: DonationRepository) {}

  async execute(donation: DonationEntity): Promise<DonationEntity> {
    return this.donationRepository.createDonation(donation);
  }
}
