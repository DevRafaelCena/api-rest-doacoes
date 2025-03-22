import { IUser } from '@/interfaces/IUser';

export default class UserEntity implements IUser {
  id: number;
  username: string;
  password: string;
  ativo: boolean;

  constructor({ id, username, password, ativo }: IUser) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.ativo = ativo;
  }
}
