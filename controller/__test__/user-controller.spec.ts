import controller from '../users-controller';
import { IUser } from '../../interfaces';

describe('Check method users-controller ', () => {
  it('should return empty result array', async () => {
    const data: IUser[] = await controller.getAllUsers();
    expect(data.length).toEqual(0);
  });

  it('should create user and return right result', async () => {
    const mockUserData: IUser = {
      id: '2e78dc71-8307-4271-9b1c-96ea0e3ea1ce',
      age: 35,
      username: 'test name',
      hobbies: ['test'],
    };

    await controller.createUser(mockUserData);
    const users: IUser[] = await controller.getAllUsers();

    expect(users.length).toEqual(1);
  });
});
