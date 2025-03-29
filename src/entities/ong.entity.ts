import { IOng } from '@/interfaces/IOng';

export default class OngEntity implements IOng {
  id?: number;
  userId: number;
  name: string;
  cnpj: string;
  addressId?: number;
  registeredAt?: Date;

  constructor({ id, userId, name, cnpj, addressId, registeredAt }: IOng) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.cnpj = cnpj;
    this.addressId = addressId;
    this.registeredAt = registeredAt || new Date();
  }
}
