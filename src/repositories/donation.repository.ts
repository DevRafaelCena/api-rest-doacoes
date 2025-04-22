import { Knex } from 'knex';
import DonationEntity from '@/entities/donation.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IDonationRepository {
  createDonation(donation: DonationEntity): Promise<DonationEntity>;
  findDonationById(id: number): Promise<DonationEntity | undefined>;
  updateDonation(donation: DonationEntity): Promise<DonationEntity>;
  listDonations(): Promise<DonationEntity[]>;
}

export class DonationRepository implements IDonationRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_donation';
  }

  async createDonation(donation: DonationEntity): Promise<DonationEntity> {
    const [createdDonation] = await this.knex<DonationEntity>(this.tableName)
      .insert(toSnakeCase(donation));

    const donationCreated = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', createdDonation)
      .first();

    return toCamelCase<DonationEntity>(donationCreated);
  }

  async findDonationById(id: number): Promise<DonationEntity | undefined> {
    const donation = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return donation ? toCamelCase<DonationEntity>(donation) : undefined;
  }

  async updateDonation(donation: DonationEntity): Promise<DonationEntity> {
    await this.knex<DonationEntity>(this.tableName)
      .update(toSnakeCase(donation))
      .where('id', donation.id);

    const donationUpdated = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', donation.id)
      .first();

    return toCamelCase<DonationEntity>(donationUpdated);
  }

  async listDonations(): Promise<DonationEntity[]> {
    const donations = await this.knex<DonationEntity>(this.tableName)
      .select('*');

    return donations.map(donation => toCamelCase<DonationEntity>(donation));
  }
} 