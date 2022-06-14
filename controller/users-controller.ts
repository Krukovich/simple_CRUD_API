import usersService from '../service/users-service';
import { ICandidate, IUser } from '../interfaces';

class UsersController {
  private userService: {
    apiGetUsers: () => Promise<IUser[]>;
    apiCreateUser: (arg: { username: string; age: number; hobbies: string | string[] }) => Promise<void>;
    apiGetUserById: (id: string) => Promise<IUser>;
    apiDeleteUser: (id: string) => Promise<void>;
    apiUpdateUser: (id: string, arg: { username: string; age: number; hobbies: string | string[] }) => Promise<void>;
  };

  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userService.apiGetUsers();
  }

  async createUser({ username, age, hobbies }: ICandidate): Promise<void> {
    await this.userService.apiCreateUser({ username, age, hobbies });
  }

  async getUserById(id: string): Promise<IUser> {
    return this.userService.apiGetUserById(id);
  }

  async deleteUser(id: string): Promise<void> {
    await this.userService.apiDeleteUser(id);
  }

  async updateUser(id: string, { username, age, hobbies }: ICandidate): Promise<void> {
    await this.userService.apiUpdateUser(id, { username, age, hobbies });
  }
}

export default new UsersController(usersService);
