import usersService from '../service/users-service';

class UsersController {
  private userService: any;

  constructor(userService) {
    this.userService = userService;
  }

  async getAllUsers() {
    return this.userService.getUsers();
  }
}

export default new UsersController(usersService);
