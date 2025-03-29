import { IAddress } from '@/interfaces/IAddress';

export default class AddressEntity implements IAddress {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  cep: string;
  city: string;
  state: string;

  constructor({ id, street, number, complement, cep, city, state }: IAddress) {
    this.id = id;
    this.street = street;
    this.number = number;
    this.complement = complement;
    this.cep = cep;
    this.city = city;
    this.state = state;
  }
}
