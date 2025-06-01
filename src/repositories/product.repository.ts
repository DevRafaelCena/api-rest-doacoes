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
  findDonorProducts(donorId: number): Promise<any[]>;
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
    donorId?: number;
  }): Promise<ProductEntity[]> {
    console.log('listar produtos disponíveis');

    let query = this.knex(this.tableName)
      .select(
        'p.*',
        'd.name as donor_name',
        'd.cnpj as donor_cnpj',
        this.knex.raw('(p.quantity - COALESCE(p.unavailable_quantity, 0)) as available_quantity')
      )
      .from(`${this.tableName} as p`)
      .join('tb_donor as d', 'p.donor_id', 'd.id')
      .whereRaw('p.quantity - COALESCE(p.unavailable_quantity, 0) > 0');

    if (filters?.categoryId) {
      query = query.where('p.category_id', filters.categoryId);
    }

    if (filters?.title) {
      query = query.where('p.title', 'like', `%${filters.title}%`);
    }

    if (filters?.donorId) {
      query = query.where('p.donor_id', filters.donorId);
    }

    const products = await query;
    return products.map((product) => {
      const { donor_name, donor_cnpj, ...productData } = product;
      return {
        ...toCamelCase<ProductEntity>(productData),
        availableQuantity: Number(product.available_quantity),
        donor: {
          name: donor_name,
          cnpj: donor_cnpj
        }
      };
    });
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
        'a.state as donor_state',
      )
      .from(`${this.tableName} as p`)
      .join('tb_donor as d', 'p.donor_id', 'd.id')
      .leftJoin('tb_address as a', 'd.address_id', 'a.id')
      .where('p.id', id)
      .first();

    if (!product) return undefined;

    const availableQuantity = product.quantity - (product.unavailable_quantity || 0);

    const {
      donor_name,
      donor_cnpj,
      donor_street,
      donor_number,
      donor_complement,
      donor_cep,
      donor_city,
      donor_state,
      ...productData
    } = product;

    return {
      ...toCamelCase(productData),
      availableQuantity,
      donor: {
        name: donor_name,
        cnpj: donor_cnpj,
        address: donor_street
          ? {
              street: donor_street,
              number: donor_number,
              complement: donor_complement,
              cep: donor_cep,
              city: donor_city,
              state: donor_state,
            }
          : null,
      },
    };
  }

  async findDonorProducts(donorId: number): Promise<any[]> {
    const products = await this.knex(this.tableName)
      .select(
        'd.id as donation_id',
        'p.id as id_product',
        'p.title',
        'p.description',
        'p.quantity as product_quantity',
        'p.measure as product_measure',
        'd.quantity as requested_quantity',
        'd.measure as requested_measure',
        'd.created_at as requested_at',
        'd.invoice_url',
        'd.accepted_at',
        'd.sent_at',
        'd.delivered_at',
        'd.completed',
        'o.id as ong_id',
        'o.name as ong_name',
        'o.cnpj as ong_cnpj',
        'o.registered_at as ong_registered_at',
        'a.street as ong_street',
        'a.number as ong_number',
        'a.complement as ong_complement',
        'a.cep as ong_cep',
        'a.city as ong_city',
        'a.state as ong_state',
        this.knex.raw('COUNT(d.id) as donation_requests_count')
      )
      .from(`${this.tableName} as p`)
      .leftJoin('tb_donation as d', 'p.id', 'd.product_id')
      .leftJoin('tb_ong as o', 'd.ong_id', 'o.id')
      .leftJoin('tb_address as a', 'o.address_id', 'a.id')
      .where('p.donor_id', donorId)
      .where('d.completed', false)
      .groupBy('p.id', 'd.id', 'o.id', 'a.id');

    return products.map((product) => ({
      donationId: product.donation_id,
      idProduct: product.id_product,
      title: product.title,
      description: product.description,
      productQuantity: product.product_quantity,
      productMeasure: product.product_measure,
      requestedQuantity: product.requested_quantity,
      requestedMeasure: product.requested_measure,
      requestedAt: product.requested_at,
      invoiceUrl: product.invoice_url,
      acceptedAt: product.accepted_at,
      sentAt: product.sent_at,
      deliveredAt: product.delivered_at,
      completed: product.completed,
      ong: {
        id: product.ong_id,
        name: product.ong_name,
        cnpj: product.ong_cnpj,
        registeredAt: product.ong_registered_at,
        address: product.ong_street ? {
          street: product.ong_street,
          number: product.ong_number,
          complement: product.ong_complement,
          cep: product.ong_cep,
          city: product.ong_city,
          state: product.ong_state
        } : null
      },
      hasDonationRequests: product.donation_requests_count > 0
    }));
  }
}
