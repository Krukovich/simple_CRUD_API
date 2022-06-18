import { ICandidate, IUser } from '../../interfaces';
import * as uuid from 'uuid';

class UsersService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async apiGetUsers(): Promise<IUser[]> {
    return this.users;
  }

  async apiCreateUser({ username, age, hobbies }: ICandidate): Promise<IUser> {
    const prepareUser: IUser = {
      id: uuid.v4(),
      age,
      hobbies,
      username,
    };
    this.users.push(prepareUser);

    return prepareUser;
  }

  async apiGetUserById(id: string): Promise<IUser> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async apiDeleteUser(id: string): Promise<IUser> {
    let candidate: IUser;
    this.users = this.users.filter((user: IUser) => {
      if (user.id !== id) {
        return user;
      } else {
        candidate = user;
      }
    });
    return candidate;
  }

  async apiUpdateUser(id: string, { username, age, hobbies }: ICandidate): Promise<IUser> {
    let prepareUser: IUser;

    this.users = this.users.map((user: IUser) => {
      if (user.id === id) {
        prepareUser = {
          id: user.id,
          username,
          age,
          hobbies,
        };
        return {
          id: user.id,
          username,
          age,
          hobbies,
        };
      } else {
        return user;
      }
    });

    return prepareUser;
  }
}

export default new UsersService();
