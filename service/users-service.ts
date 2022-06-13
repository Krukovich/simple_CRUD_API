import { ICandidate, IUser } from '../interfaces';
import * as uuid from 'uuid';

class UsersService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async apiGetUsers(): Promise<IUser[]> {
    return this.users;
  }

  async apiCreateUser({ username, age, hobbies }: ICandidate): Promise<void> {
    this.users.push({
      id: uuid.v4(),
      age,
      hobbies,
      username,
    });
  }
}

export default new UsersService();
