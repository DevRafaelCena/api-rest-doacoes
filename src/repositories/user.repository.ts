import { Knex } from 'knex';
import UserEntity from '@/entities/user.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IUserRepository {
  findUser(username: string): Promise<UserEntity | undefined>;
  createUser(user: UserEntity): Promise<UserEntity>;
  updateUser(user: UserEntity): Promise<UserEntity>;
  findUserById(id: number): Promise<UserEntity | undefined>;
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
    const [updatedUser] = await this.knex<UserEntity>(this.tableName)
      .update(toSnakeCase(user))
      .where('id', user.id)
      .returning('*');

    return toCamelCase<UserEntity>(updatedUser);
  }

  async findUserById(id: number): Promise<UserEntity | undefined> {
    const user = await this.knex<UserEntity>(this.tableName).select('*').where('id', id).first();

    return user ? toCamelCase<UserEntity>(user) : undefined;
  }
}
