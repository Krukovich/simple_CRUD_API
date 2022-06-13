import { IUser } from '../interfaces';

class UsersService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async getUsers(): Promise<IUser[]> {
    return this.users;
  }
}

export default new UsersService();
