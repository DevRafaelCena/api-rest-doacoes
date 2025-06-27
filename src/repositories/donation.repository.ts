import { Knex } from 'knex';
import DonationEntity from '@/entities/donation.entity';
import { toCamelCase, toSnakeCase } from '@/utils/caseConverter';

export interface IDonationRepository {
  createDonation(donation: DonationEntity): Promise<DonationEntity>;
  findDonationById(id: number): Promise<DonationEntity | undefined>;
  updateDonation(donation: DonationEntity): Promise<DonationEntity>;
  listDonations(): Promise<DonationEntity[]>;
  findDonationRequests(filters?: { donorId?: number; ongId?: number }): Promise<any[]>;
  findAvailableForTransport(): Promise<any[]>;
  assignTransporter(donationId: number, transporterId: number): Promise<DonationEntity | undefined>;
  findInProgressByTransporter(transporterId: number): Promise<any[]>;
  completeTransport(donationId: number, transporterId: number): Promise<DonationEntity | undefined>;
}

export class DonationRepository implements IDonationRepository {
  private tableName: string;
  private knex: Knex;

  constructor(knex: Knex) {
    this.knex = knex;
    this.tableName = 'tb_donation';
  }

  async createDonation(donation: DonationEntity): Promise<DonationEntity> {
    const [createdDonation] = await this.knex<DonationEntity>(this.tableName).insert(
      toSnakeCase(donation),
    );

    const donationCreated = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', createdDonation)
      .first();

    return toCamelCase<DonationEntity>(donationCreated);
  }

  async findDonationById(id: number): Promise<DonationEntity | undefined> {
    const donation = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', id)
      .first();

    return donation ? toCamelCase<DonationEntity>(donation) : undefined;
  }

  async updateDonation(donation: DonationEntity): Promise<DonationEntity> {
    await this.knex<DonationEntity>(this.tableName)
      .update(toSnakeCase(donation))
      .where('id', donation.id);

    const donationUpdated = await this.knex<DonationEntity>(this.tableName)
      .select('*')
      .where('id', donation.id)
      .first();

    return toCamelCase<DonationEntity>(donationUpdated);
  }

  async listDonations(): Promise<DonationEntity[]> {
    const donations = await this.knex<DonationEntity>(this.tableName).select('*');

    return donations.map((donation) => toCamelCase<DonationEntity>(donation));
  }

  async findDonationRequests(filters?: { donorId?: number; ongId?: number }): Promise<any[]> {
    let query = this.knex(this.tableName)
      .select(
        'd.*',
        'p.title as product_title',
        'donor.name as donor_name',
        'donor.cnpj as donor_cnpj',
        'ong.name as ong_name',
        'ong.cnpj as ong_cnpj',
      )
      .from(`${this.tableName} as d`)
      .join('tb_product as p', 'd.product_id', 'p.id')
      .join('tb_donor as donor', 'p.donor_id', 'donor.id')
      .join('tb_ong as ong', 'd.ong_id', 'ong.id')
      .where('d.completed', false);

    if (filters?.donorId) {
      query = query.where('p.donor_id', filters.donorId);
    }

    if (filters?.ongId) {
      query = query.where('d.ong_id', filters.ongId);
    }

    const donations = await query;
    return donations.map((donation) => ({
      ...toCamelCase(donation),
      productTitle: donation.product_title,
      productQuantity: donation.product_quantity,
      productMeasure: donation.product_measure,
      donorName: donation.donor_name,
      donorCnpj: donation.donor_cnpj,
      ongName: donation.ong_name,
      ongCnpj: donation.ong_cnpj,
    }));
  }

  async findAvailableForTransport(): Promise<any[]> {
    const donations = await this.knex(this.tableName)
      .select(
        'd.*',
        'donor.name as donor_name',
        'donor_address.street as donor_street',
        'donor_address.number as donor_number',
        'donor_address.complement as donor_complement',
        'donor_address.cep as donor_cep',
        'donor_address.city as donor_city',
        'donor_address.state as donor_state',
        'ong.name as ong_name',
        'ong_address.street as ong_street',
        'ong_address.number as ong_number',
        'ong_address.complement as ong_complement',
        'ong_address.cep as ong_cep',
        'ong_address.city as ong_city',
        'ong_address.state as ong_state'
      )
      .from(`${this.tableName} as d`)
      .join('tb_product as p', 'd.product_id', 'p.id')
      .join('tb_donor as donor', 'p.donor_id', 'donor.id')
      .leftJoin('tb_address as donor_address', 'donor.address_id', 'donor_address.id')
      .join('tb_ong as ong', 'd.ong_id', 'ong.id')
      .leftJoin('tb_address as ong_address', 'ong.address_id', 'ong_address.id')
      .whereNotNull('d.accepted_at')
      .whereNull('d.delivered_at')
      .where('d.completed', false)
      .whereNull('d.transporter_id');

    return donations.map((donation) => {
      const camel = toCamelCase(donation) || {};
      const rest = { ...camel };
      delete (rest as any).donorName;
      delete (rest as any).donorStreet;
      delete (rest as any).donorNumber;
      delete (rest as any).donorComplement;
      delete (rest as any).donorCep;
      delete (rest as any).donorCity;
      delete (rest as any).donorState;
      delete (rest as any).ongName;
      delete (rest as any).ongStreet;
      delete (rest as any).ongNumber;
      delete (rest as any).ongComplement;
      delete (rest as any).ongCep;
      delete (rest as any).ongCity;
      delete (rest as any).ongState;
      return Object.assign({}, rest, {
        origem: {
          nome: donation.donor_name,
          origin: {
            street: donation.donor_street,
            number: donation.donor_number,
            complement: donation.donor_complement,
            cep: donation.donor_cep,
            city: donation.donor_city,
            state: donation.donor_state,
          }
        },
        destiny: {
          nome: donation.ong_name,
          endereco: {
            street: donation.ong_street,
            number: donation.ong_number,
            complement: donation.ong_complement,
            cep: donation.ong_cep,
            city: donation.ong_city,
            state: donation.ong_state,
          }
        }
      });
    });
  }

  async assignTransporter(
    donationId: number,
    transporterId: number,
  ): Promise<DonationEntity | undefined> {
    await this.knex<DonationEntity>(this.tableName)
      .update({ transporter_id: transporterId, picked_up_at: new Date() } as any)
      .where('id', donationId)
      .andWhere('transporter_id', null);
    return this.findDonationById(donationId);
  }

  async findInProgressByTransporter(transporterId: number): Promise<any[]> {
    const donations = await this.knex(this.tableName)
      .select(
        'd.*',
        'donor.name as donor_name',
        'donor_address.street as donor_street',
        'donor_address.number as donor_number',
        'donor_address.complement as donor_complement',
        'donor_address.cep as donor_cep',
        'donor_address.city as donor_city',
        'donor_address.state as donor_state',
        'ong.name as ong_name',
        'ong_address.street as ong_street',
        'ong_address.number as ong_number',
        'ong_address.complement as ong_complement',
        'ong_address.cep as ong_cep',
        'ong_address.city as ong_city',
        'ong_address.state as ong_state'
      )
      .from(`${this.tableName} as d`)
      .join('tb_product as p', 'd.product_id', 'p.id')
      .join('tb_donor as donor', 'p.donor_id', 'donor.id')
      .leftJoin('tb_address as donor_address', 'donor.address_id', 'donor_address.id')
      .join('tb_ong as ong', 'd.ong_id', 'ong.id')
      .leftJoin('tb_address as ong_address', 'ong.address_id', 'ong_address.id')
      .where('d.transporter_id', transporterId)
      .where('d.completed', false)
      .whereNull('d.delivered_by_transporter_at');

    return donations.map((donation) => {
      const camel = toCamelCase(donation) || {};
      const rest = { ...camel };
      delete (rest as any).donorName;
      delete (rest as any).donorStreet;
      delete (rest as any).donorNumber;
      delete (rest as any).donorComplement;
      delete (rest as any).donorCep;
      delete (rest as any).donorCity;
      delete (rest as any).donorState;
      delete (rest as any).ongName;
      delete (rest as any).ongStreet;
      delete (rest as any).ongNumber;
      delete (rest as any).ongComplement;
      delete (rest as any).ongCep;
      delete (rest as any).ongCity;
      delete (rest as any).ongState;
      return Object.assign({}, rest, {
        origin: {
          nome: donation.donor_name,
          origin: {
            street: donation.donor_street,
            number: donation.donor_number,
            complement: donation.donor_complement,
            cep: donation.donor_cep,
            city: donation.donor_city,
            state: donation.donor_state,
          }
        },
        destiny: {
          nome: donation.ong_name,
          endereco: {
            street: donation.ong_street,
            number: donation.ong_number,
            complement: donation.ong_complement,
            cep: donation.ong_cep,
            city: donation.ong_city,
            state: donation.ong_state,
          }
        }
      });
    });
  }

  async completeTransport(
    donationId: number,
    transporterId: number,
  ): Promise<DonationEntity | undefined> {
    await this.knex<DonationEntity>(this.tableName)
      .update({ delivered_by_transporter_at: new Date() } as any)
      .where('id', donationId)
      .andWhere('transporter_id', transporterId)
      .andWhere('completed', false);
    return this.findDonationById(donationId);
  }
}
