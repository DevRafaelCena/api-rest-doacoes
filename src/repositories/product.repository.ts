import { Knex } from 'knex';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';
import { ProductEntity } from '@/entities/product.entity';

export interface IProductRepository {
  createProduct(product: ProductEntity): Promise<ProductEntity>;
  updateProduct(product: ProductEntity): Promise<ProductEntity>;
  findProductById(id: number): Promise<ProductEntity | undefined>;
  findProductsByDonorId(donorId: number): Promise<ProductEntity[]>;
  findAvailableProducts(filters?: {
    categoryId?: number;
    title?: string;
  }): Promise<ProductEntity[]>;
  deleteProduct(id: number): Promise<void>;
  updateUnavailableQuantity(productId: number, quantity: number): Promise<void>;
  findProductDetails(id: number): Promise<any>;
}

export class ProductRepository implements IProductRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_product';
  }

  async createProduct(product: ProductEntity): Promise<ProductEntity> {
    const [id] = await this.knex<ProductEntity>(this.tableName).insert(toSnakeCase(product));

    const createdProduct = await this.knex<ProductEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return toCamelCase<ProductEntity>(createdProduct);
  }

  async updateProduct(product: ProductEntity): Promise<ProductEntity> {
    await this.knex<ProductEntity>(this.tableName)
      .update(toSnakeCase(product))
      .where('id', product.id);

    const productUpdated = await this.knex<ProductEntity>(this.tableName)
      .select('*')
      .where('id', product.id)
      .first();

    return toCamelCase<ProductEntity>(productUpdated);
  }

  async findProductById(id: number): Promise<ProductEntity | undefined> {
    const product = await this.knex<ProductEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return product ? toCamelCase<ProductEntity>(product) : undefined;
  }

  async findProductsByDonorId(donorId: number): Promise<ProductEntity[]> {
    const products = await this.knex<ProductEntity>(this.tableName)
      .select('*')
      .where('donor_id', donorId);

    return products.map((product) => toCamelCase<ProductEntity>(product));
  }

  async findAvailableProducts(filters?: {
    categoryId?: number;
    title?: string;
  }): Promise<ProductEntity[]> {
    console.log('listar produtos disponíveis');

    let query = this.knex<ProductEntity>(this.tableName)
      .select('*')
      .whereRaw('quantity - unavailable_quantity > 0');

    if (filters?.categoryId) {
      query = query.where('category_id', filters.categoryId);
    }

    if (filters?.title) {
      query = query.where('title', 'like', `%${filters.title}%`);
    }

    const products = await query;
    return products.map((product) => toCamelCase<ProductEntity>(product));
  }

  async deleteProduct(id: number): Promise<void> {
    await this.knex<ProductEntity>(this.tableName).where('id', id).delete();
  }

  async updateUnavailableQuantity(productId: number, quantity: number): Promise<void> {
    await this.knex<ProductEntity>(this.tableName)
      .where('id', productId)
      .update({
        unavailable_quantity: this.knex.raw('unavailable_quantity + ?', [quantity]),
      } as any);
  }

  async findProductDetails(id: number): Promise<any> {
    console.log('detalhe produto');

    const product = await this.knex(this.tableName)
      .select(
        'p.*',
        'd.name as donor_name',
        'd.cnpj as donor_cnpj',
        'a.street as donor_street',
        'a.number as donor_number',
        'a.complement as donor_complement',
        'a.cep as donor_cep',
        'a.city as donor_city',
        'a.state as donor_state'
      )
      .from(`${this.tableName} as p`)
      .join('tb_donor as d', 'p.donor_id', 'd.id')
      .leftJoin('tb_address as a', 'd.address_id', 'a.id')
      .where('p.id', id)
      .first();

    if (!product) return undefined;

    const availableQuantity = product.quantity - (product.unavailable_quantity || 0);
    
    const { 
      donor_name, donor_cnpj, 
      donor_street, donor_number, donor_complement, donor_cep, donor_city, donor_state,
      ...productData 
    } = product;
    
    return {
      ...toCamelCase(productData),
      availableQuantity,
      donor: {
        name: donor_name,
        cnpj: donor_cnpj,
        address: donor_street ? {
          street: donor_street,
          number: donor_number,
          complement: donor_complement,
          cep: donor_cep,
          city: donor_city,
          state: donor_state
        } : null
      }
    };
  }
}
