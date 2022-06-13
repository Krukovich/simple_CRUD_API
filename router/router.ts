import { IncomingMessage, ServerResponse } from 'http';
import usersController from '../controller/users-controller';
import { IUser } from '../interfaces';
import { STATUS_CODE } from '../constants';

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  switch (request.url) {
    case '/api/users':
      try {
        const users: IUser[] = await usersController.getAllUsers();
        response.statusCode = STATUS_CODE.OK;
        response.end(JSON.stringify({ users }));
      } catch (e) {
        response.statusCode = STATUS_CODE.INTERNAL_SERVER_ERROR;
        response.end(JSON.stringify('INTERNAL_SERVER_ERROR'));
      }
      break;
    default:
      response.statusCode = STATUS_CODE.NOT_FOUND;
      response.end('BAD_REQUEST');
      break;
  }
};

//TODO IMPLEMENT THIS ENDPOINT
// api/users GET
// api/users/${userId} GET
// api/users POST
// api/users/{userId} PUT
// api/users/${userId} DELETE
