import controller from '../users-controller';
import { IUser } from '../../interfaces';

const mockUserData: IUser = {
  id: '2e78dc71-8307-4271-9b1c-96ea0e3ea1ce',
  age: 35,
  username: 'test name',
  hobbies: ['test'],
};

describe('Check method users-controller ', () => {
  it('should return empty result array', async () => {
    const data: IUser[] = await controller.getAllUsers();
    expect(data.length).toEqual(0);
  });

  it('should create user and return right result', async () => {
    await controller.createUser(mockUserData);
    const users: IUser[] = await controller.getAllUsers();

    expect(users.length).toEqual(1);
  });

  it('should update user correct', async () => {
    const mockUpdateData = {
      age: 35,
      username: 'test test',
      hobbies: ['test, test, test'],
    };

    await controller.createUser(mockUserData);
    const users: IUser[] = await controller.getAllUsers();
    const [user] = users;

    const updateUser: IUser = await controller.updateUser(user.id, mockUpdateData)

    expect(users.length).toEqual(2);
    expect(updateUser).toMatchObject(mockUpdateData);
  });

  it('should delete user correct', async () => {
    const users: IUser[] = await controller.getAllUsers();
    const [firstUser] = users;

    expect(users.length).toEqual(2);

    await controller.deleteUser(firstUser.id);

    const newUsers: IUser[] = await controller.getAllUsers();

    expect(newUsers.length).toBe(1);
  });
});
