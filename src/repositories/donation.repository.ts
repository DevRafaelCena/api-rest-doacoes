import { Knex } from 'knex';
import DonationEntity from '@/entities/donation.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IDonationRepository {
  createDonation(donation: DonationEntity): Promise<DonationEntity>;
  findDonationById(id: number): Promise<DonationEntity | undefined>;
  updateDonation(donation: DonationEntity): Promise<DonationEntity>;
  listDonations(): Promise<DonationEntity[]>;
  findDonationRequests(filters?: { donorId?: number; ongId?: number }): Promise<any[]>;
}

export class DonationRepository implements IDonationRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_donation';
  }

  async createDonation(donation: DonationEntity): Promise<DonationEntity> {
    const [createdDonation] = await this.knex<DonationEntity>(this.tableName).insert(
      toSnakeCase(donation),
    );

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
    const donations = await this.knex<DonationEntity>(this.tableName).select('*');

    return donations.map((donation) => toCamelCase<DonationEntity>(donation));
  }

  async findDonationRequests(filters?: { donorId?: number; ongId?: number }): Promise<any[]> {
    let query = this.knex(this.tableName)
      .select(
        'd.*',
        'p.title as product_title',
        'donor.name as donor_name',
        'donor.cnpj as donor_cnpj',
        'ong.name as ong_name',
        'ong.cnpj as ong_cnpj',
      )
      .from(`${this.tableName} as d`)
      .join('tb_product as p', 'd.product_id', 'p.id')
      .join('tb_donor as donor', 'p.donor_id', 'donor.id')
      .join('tb_ong as ong', 'd.ong_id', 'ong.id')
      .where('d.completed', false);

    if (filters?.donorId) {
      query = query.where('p.donor_id', filters.donorId);
    }

    if (filters?.ongId) {
      query = query.where('d.ong_id', filters.ongId);
    }

    const donations = await query;
    return donations.map((donation) => ({
      ...toCamelCase(donation),
      productTitle: donation.product_title,
      productQuantity: donation.product_quantity,
      productMeasure: donation.product_measure,
      donorName: donation.donor_name,
      donorCnpj: donation.donor_cnpj,
      ongName: donation.ong_name,
      ongCnpj: donation.ong_cnpj,
    }));
  }
}
