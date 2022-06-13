import usersService from '../service/users-service';
import { IUser } from '../interfaces';

class UsersController {
  private userService: any;

  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers(): Promise<IUser[]> {
    return this.userService.getUsers();
  }
}

export default new UsersController(usersService);
