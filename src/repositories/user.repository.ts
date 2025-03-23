import { Knex } from 'knex';
import UserEntity from '@/entities/user.entity';
import { toCamelCase } from '@/utils/caseConverter';

export interface IUserRepository {
  findUser(username: string): Promise<UserEntity | undefined>;
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
}
