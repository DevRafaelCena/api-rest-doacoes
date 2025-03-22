import { Knex } from 'knex';
import { IUser } from '@/interfaces/IUser';
import UserEntity from '@/entities/user.entity';

export interface IUserRepository {
  findUser(username: string): Promise<IUser | undefined>;
}

export class UserRepository implements IUserRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'user';
  }

  async findUser(username: string): Promise<IUser | undefined> {
    const user = await this.knex<UserEntity>(this.tableName)
      .select('*')
      .where('username', username)
      .andWhere('ativo', 1)
      .first();

    return user;
  }
}
