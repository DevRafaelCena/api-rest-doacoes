import { Knex } from 'knex';
import AddressEntity from '@/entities/address.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IAddressRepository {
  createAddress(address: AddressEntity): Promise<AddressEntity>;
  updateAddress(address: AddressEntity): Promise<AddressEntity>;
  findAddressById(id: number): Promise<AddressEntity | undefined>;
}

export class AddressRepository implements IAddressRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_address';
  }

  async createAddress(address: AddressEntity): Promise<AddressEntity> {
    const [createdAddress] = await this.knex<AddressEntity>(this.tableName).insert(
      toSnakeCase(address),
    );

    const findAddressById = await this.knex<AddressEntity>(this.tableName)
      .select('*')
      .first()
      .where('id', createdAddress);

    return toCamelCase<AddressEntity>(findAddressById);
  }

  async updateAddress(address: AddressEntity): Promise<AddressEntity> {
    const [updatedAddress] = await this.knex<AddressEntity>(this.tableName)
      .update(toSnakeCase(address))
      .where('id', address.id)
      .returning('*');

    return toCamelCase<AddressEntity>(updatedAddress);
  }

  async findAddressById(id: number): Promise<AddressEntity | undefined> {
    const address = await this.knex<AddressEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return address ? toCamelCase<AddressEntity>(address) : undefined;
  }
}
