export interface CreateAddressDTO {
  street: string;
  number: string;
  complement?: string;
  cep: string;
  city: string;
  state: string;
  userId: number;
}
