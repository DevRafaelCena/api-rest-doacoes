export interface ITransporter {
  id?: number;
  userId: number;
  name: string;
  cnpj?: string;
  cpf?: string;
  capacity: number;
  measure: string;
  addressId?: number;
  registeredAt?: Date;
}
