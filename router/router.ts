import { IncomingMessage, ServerResponse } from 'http';
import usersController from '../controller/users-controller';
import { IUser } from '../interfaces';
import { STATUS_CODE } from '../constants';

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  switch (request.url) {
    case '/':
      const users: IUser = await usersController.getAllUsers();
      response.statusCode = STATUS_CODE.OK;
      response.end(JSON.stringify({ users }));
      break;
    case '/about':
      response.end('about');
      break;
    case '/services':
      response.end('services');
      break;
    default:
      break;
  }
};
