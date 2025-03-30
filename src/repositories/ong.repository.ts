import { Knex } from 'knex';
import OngEntity from '@/entities/ong.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IOngRepository {
  findOng(cnpj: string): Promise<OngEntity | undefined>;
  createOng(ong: OngEntity): Promise<OngEntity>;
  updateOng(ong: OngEntity): Promise<OngEntity>;
  findOngById(id: number): Promise<OngEntity | undefined>;
  findOngByUserId(userId: number): Promise<OngEntity | undefined>;
}

export class OngRepository implements IOngRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_ong';
  }

  async findOng(cnpj: string): Promise<OngEntity | undefined> {
    const ong = await this.knex<OngEntity>(this.tableName).select('*').where('cnpj', cnpj).first();

    return ong ? toCamelCase<OngEntity>(ong) : undefined;
  }

  async createOng(ong: OngEntity): Promise<OngEntity> {
    const [createdOng] = await this.knex<OngEntity>(this.tableName).insert(toSnakeCase(ong));

    if (!createdOng) {
      throw new Error('Error creating ONG');
    }

    const id = createdOng as number;

    const ongCreated = await this.knex<OngEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return toCamelCase<OngEntity>(ongCreated);
  }

  async updateOng(ong: OngEntity): Promise<OngEntity> {
    await this.knex<OngEntity>(this.tableName).update(toSnakeCase(ong)).where('id', ong.id);

    const ongUpdated = await this.knex<OngEntity>(this.tableName)
      .select('*')
      .where('id', ong.id)
      .first();

    return toCamelCase<OngEntity>(ongUpdated);
  }

  async findOngById(id: number): Promise<OngEntity | undefined> {
    const ong = await this.knex<OngEntity>(this.tableName).select('*').where('id', id).first();

    return ong ? toCamelCase<OngEntity>(ong) : undefined;
  }

  async findOngByUserId(userId: number): Promise<OngEntity | undefined> {
    const ong = await this.knex<OngEntity>(this.tableName)
      .select('*')
      .where('user_id', userId)
      .first();

    return ong ? toCamelCase<OngEntity>(ong) : undefined;
  }
}
