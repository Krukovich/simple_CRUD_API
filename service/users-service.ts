class UsersService {
  public users;

  constructor() {
    this.users = [];
  }

  async getUsers() {
    return this.users;
  }
}

export default new UsersService();