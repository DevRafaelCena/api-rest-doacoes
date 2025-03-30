import { Knex } from 'knex';
import DonorEntity from '@/entities/donor.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IDonorRepository {
  findDonor(cnpj: string): Promise<DonorEntity | undefined>;
  createDonor(donor: DonorEntity): Promise<DonorEntity>;
  updateDonor(donor: DonorEntity): Promise<DonorEntity>;
  findDonorById(id: number): Promise<DonorEntity | undefined>;
  findDonorByUserId(userId: number): Promise<DonorEntity | undefined>;
}

export class DonorRepository implements IDonorRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_donor';
  }

  async findDonor(cnpj: string): Promise<DonorEntity | undefined> {
    const user = await this.knex<DonorEntity>(this.tableName)
      .select('*')
      .where('cnpj', cnpj)
      .first();

    return user ? toCamelCase<DonorEntity>(user) : undefined;
  }

  async createDonor(donor: DonorEntity): Promise<DonorEntity> {
    const [createdUser] = await this.knex<DonorEntity>(this.tableName).insert(toSnakeCase(donor));

    const donorCreated = await this.knex<DonorEntity>(this.tableName)
      .select('*')
      .where('id', createdUser)
      .first();

    return toCamelCase<DonorEntity>(donorCreated);
  }

  async updateDonor(donor: DonorEntity): Promise<DonorEntity> {
    await this.knex<DonorEntity>(this.tableName).update(toSnakeCase(donor)).where('id', donor.id);

    const updatedUser = await this.knex<DonorEntity>(this.tableName)
      .select('*')
      .where('id', donor.id)
      .first();

    return toCamelCase<DonorEntity>(updatedUser);
  }

  async findDonorById(id: number): Promise<DonorEntity | undefined> {
    const user = await this.knex<DonorEntity>(this.tableName).select('*').where('id', id).first();

    return user ? toCamelCase<DonorEntity>(user) : undefined;
  }

  async findDonorByUserId(userId: number): Promise<DonorEntity | undefined> {
    const user = await this.knex<DonorEntity>(this.tableName)
      .select('*')
      .where('user_id', userId)
      .first();

    return user ? toCamelCase<DonorEntity>(user) : undefined;
  }
}
