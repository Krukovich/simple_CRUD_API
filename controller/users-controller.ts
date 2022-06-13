import usersService from '../service/users-service';
import { ICandidate, IUser } from '../interfaces';

class UsersController {
  private userService: any;

  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.userService.apiGetUsers();
  }

  async createUser({ username, age, hobbies }: ICandidate): Promise<void> {
    await this.userService.apiCreateUser({ username, age, hobbies });
  }
}

export default new UsersController(usersService);
