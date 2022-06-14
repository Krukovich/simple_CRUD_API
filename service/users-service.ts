import { ICandidate, IUser } from '../interfaces';
import uuid from 'uuid';

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

  async apiGetUserById(id: string): Promise<IUser> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async apiDeleteUser(id: string): Promise<void> {
    this.users = this.users.filter((user: IUser) => user.id !== id);
  }

  async apiUpdateUser(id: string, { username, age, hobbies }: ICandidate): Promise<void> {
    this.users = this.users.filter((user: IUser) => {
      if (user.id === id) {
        return {
          id: user.id,
          username,
          age,
          hobbies,
        };
      }
    });
  }
}

export default new UsersService();
