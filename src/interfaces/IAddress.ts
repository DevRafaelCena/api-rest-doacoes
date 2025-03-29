export interface IAddress {
  id?: number;
  street: string;
  number: string;
  complement?: string;
  cep: string;
  city: string;
  state: string;
}
