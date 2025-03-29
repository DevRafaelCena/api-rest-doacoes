export interface IDonor {
  id?: number;
  userId: number;
  name: string;
  cnpj: string;
  addressId?: number;
  registeredAt?: Date;
}
