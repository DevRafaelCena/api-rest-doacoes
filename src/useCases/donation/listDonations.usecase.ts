import { DonationRepository } from '@/repositories/donation.repository';
import DonationEntity from '@/entities/donation.entity';

interface ListDonationsFilters {
  productId?: number;
  ongId?: number;
}

export class ListDonationsUseCase {
  constructor(private donationRepository: DonationRepository) {}

  async execute(filters: ListDonationsFilters): Promise<DonationEntity[]> {
    const donations = await this.donationRepository.listDonations();

    return donations.filter(donation => {
      if (filters.productId && donation.productId !== filters.productId) {
        return false;
      }
      if (filters.ongId && donation.ongId !== filters.ongId) {
        return false;
      }
      return true;
    });
  }
} 