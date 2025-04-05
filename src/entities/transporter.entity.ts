import { ITransporter } from '@/interfaces/ITransporter';

export default class TransporterEntity implements ITransporter {
  id?: number;
  userId: number;
  name: string;
  cnpj?: string;
  cpf?: string;
  capacity: number;
  measure: string;
  addressId?: number;
  registeredAt?: Date;

  constructor({
    id,
    userId,
    name,
    cnpj,
    addressId,
    registeredAt,
    cpf,
    capacity,
    measure,
  }: ITransporter) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.cnpj = cnpj;
    this.cpf = cpf;
    this.capacity = capacity;
    this.measure = measure;
    this.addressId = addressId;
    this.registeredAt = registeredAt || new Date();
  }
}
