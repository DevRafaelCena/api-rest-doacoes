import { IDonationRepository } from '@/repositories/donation.repository';

export class TransporterService {
  constructor(private donationRepository: IDonationRepository) {}

  async listAvailable() {
    return this.donationRepository.findAvailableForTransport();
  }

  async accept(donationId: number, transporterId: number) {
    return this.donationRepository.assignTransporter(donationId, transporterId);
  }

  async inProgress(transporterId: number) {
    return this.donationRepository.findInProgressByTransporter(transporterId);
  }

  async complete(donationId: number, transporterId: number) {
    return this.donationRepository.completeTransport(donationId, transporterId);
  }
} 