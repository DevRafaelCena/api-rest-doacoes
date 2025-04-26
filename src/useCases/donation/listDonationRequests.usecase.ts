import { DonationRepository } from '@/repositories/donation.repository';

export class ListDonationRequestsUseCase {
  constructor(private donationRepository: DonationRepository) {}

  async execute(filters?: { donorId?: number; ongId?: number }) {
    return this.donationRepository.findDonationRequests(filters);
  }
}
