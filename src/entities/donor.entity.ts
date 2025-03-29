import { IDonor } from '@/interfaces/IDonor';

export default class DonorEntity implements IDonor {
  id?: number;
  userId: number;
  name: string;
  cnpj: string;
  addressId?: number;
  registeredAt?: Date;

  constructor({ id, userId, name, cnpj, addressId, registeredAt }: IDonor) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.cnpj = cnpj;
    this.addressId = addressId;
    this.registeredAt = registeredAt || new Date();
  }
}
