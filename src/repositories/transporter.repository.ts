import { Knex } from 'knex';
import TransporterEntity from '@/entities/transporter.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface ITransporterRepository {
  findTransporter(cnpj: string): Promise<TransporterEntity | undefined>;
  createTransporter(transporter: TransporterEntity): Promise<TransporterEntity>;
  updateTransporter(transporter: TransporterEntity): Promise<TransporterEntity>;
  findTransporterById(id: number): Promise<TransporterEntity | undefined>;
  findTransporterByUserId(userId: number): Promise<TransporterEntity | undefined>;
}

export class TransporterRepository implements ITransporterRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_transporter';
  }

  async findTransporter(cnpj: string): Promise<TransporterEntity | undefined> {
    const transporter = await this.knex<TransporterEntity>(this.tableName)
      .select('*')
      .where('cnpj', cnpj)
      .first();

    return transporter ? toCamelCase<TransporterEntity>(transporter) : undefined;
  }

  async createTransporter(transporter: TransporterEntity): Promise<TransporterEntity> {
    const [createdTransporter] = await this.knex<TransporterEntity>(this.tableName).insert(
      toSnakeCase(transporter),
    );

    const transporterCreated = await this.knex<TransporterEntity>(this.tableName)
      .select('*')
      .where('id', createdTransporter)
      .first();

    return toCamelCase<TransporterEntity>(transporterCreated);
  }

  async updateTransporter(transporter: TransporterEntity): Promise<TransporterEntity> {
    await this.knex<TransporterEntity>(this.tableName)
      .update(toSnakeCase(transporter))
      .where('id', transporter.id);

    const updatedTransporter = await this.knex<TransporterEntity>(this.tableName)
      .select('*')
      .where('id', transporter.id)
      .first();

    return toCamelCase<TransporterEntity>(updatedTransporter);
  }

  async findTransporterById(id: number): Promise<TransporterEntity | undefined> {
    const transporter = await this.knex<TransporterEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return transporter ? toCamelCase<TransporterEntity>(transporter) : undefined;
  }

  async findTransporterByUserId(userId: number): Promise<TransporterEntity | undefined> {
    const transporter = await this.knex<TransporterEntity>(this.tableName)
      .select('*')
      .where('user_id', userId)
      .first();

    return transporter ? toCamelCase<TransporterEntity>(transporter) : undefined;
  }
}
