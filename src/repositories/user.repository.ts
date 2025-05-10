import { Knex } from 'knex';
import UserEntity from '@/entities/user.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IUserRepository {
  findUser(username: string): Promise<UserEntity | undefined>;
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(user: UserEntity): Promise<UserEntity>;
  findUserById(id: number): Promise<UserEntity | undefined>;
  findDonorInfo(userId: number): Promise<any>;
  findOngInfo(userId: number): Promise<any>;
  findTransporterInfo(userId: number): Promise<any>;
}

export class UserRepository implements IUserRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_user';
  }

  async findUser(username: string): Promise<UserEntity | undefined> {
    const user = await this.knex<UserEntity>(this.tableName)
      .select('*')
      .where('username', username)
      .first();

    return user ? toCamelCase<UserEntity>(user) : undefined;
  }

  async createUser(user: UserEntity): Promise<UserEntity> {
    const [insertedId] = await this.knex<UserEntity>(this.tableName).insert(toSnakeCase(user));

    const createdUser = await this.knex<UserEntity>(this.tableName).where('id', insertedId).first();

    return toCamelCase<UserEntity>(createdUser);
  }

  async updateUser(user: UserEntity): Promise<UserEntity> {
    await this.knex<UserEntity>(this.tableName).update(toSnakeCase(user)).where('id', user.id);

    const updatedUser = await this.knex<UserEntity>(this.tableName)
      .select('*')
      .where('id', user.id)
      .first();

    return toCamelCase<UserEntity>(updatedUser);
  }

  async findUserById(id: number): Promise<UserEntity | undefined> {
    const user = await this.knex<UserEntity>(this.tableName).select('*').where('id', id).first();

    return user ? toCamelCase<UserEntity>(user) : undefined;
  }

  async findDonorInfo(userId: number): Promise<any> {
    const donor = await this.knex('tb_donor')
      .select(
        'tb_donor.id as donorId',
        'tb_donor.name',
        'tb_donor.cnpj',
        'tb_donor.registered_at'
      )
      .where('tb_donor.user_id', userId)
      .first();

    return donor ? toCamelCase(donor) : undefined;
  }

  async findOngInfo(userId: number): Promise<any> {
    const ong = await this.knex('tb_ong')
      .select(
        'tb_ong.id as ongId',
        'tb_ong.name',
        'tb_ong.cnpj',
        'tb_ong.registered_at'
      )
      .where('tb_ong.user_id', userId)
      .first();

    return ong ? toCamelCase(ong) : undefined;
  }

  async findTransporterInfo(userId: number): Promise<any> {
    const transporter = await this.knex('tb_transporter')
      .select(
        'tb_transporter.id as transporterId',
        'tb_transporter.name',
        'tb_transporter.cnpj',
        'tb_transporter.cpf',
        'tb_transporter.capacity',
        'tb_transporter.measure',
        'tb_transporter.registered_at',
      )
      .where('tb_transporter.user_id', userId)
      .first();

    return transporter ? toCamelCase(transporter) : undefined;
  }
}
