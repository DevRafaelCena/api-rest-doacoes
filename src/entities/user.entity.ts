import { UserRole } from '@/enums/user-role';
import { IUser } from '@/interfaces/IUser';

export default class UserEntity implements IUser {
  id: number;
  username: string;
  password: string;
  role: UserRole;

  constructor({ id, username, password, role }: IUser) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
  }
}
