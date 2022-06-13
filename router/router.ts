import { IncomingMessage, ServerResponse } from 'http';
import usersController from '../controller/users-controller';
import { ICandidate, IUser } from '../interfaces';
import { HTTP_METHOD, STATUS_CODE } from '../constants';
import { getRequestData } from '../utils';

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  switch (request.method) {
    case HTTP_METHOD.GET:
      if (request.url === '/api/users') {
        try {
          const users: IUser[] = await usersController.getAllUsers();
          response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ users }));
        } catch (e) {
          response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
          response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
        }
      } else if (request.url.match(/\/api\/users\/(\d+)/)) {
        //TODO COMPLETE THIS ENDPOINT
      }
      break;
    case HTTP_METHOD.POST:
      try {
        const { username, age, hobbies }: ICandidate = await getRequestData(request);
        await usersController.createUser({ username, age, hobbies });
        response.writeHead(STATUS_CODE.CREATED);
        response.end();
      } catch (e) {}
      break;
    case HTTP_METHOD.PUT:
      break;
    case HTTP_METHOD.DELETE:
      break;
    default:
      break;
  }
};

//TODO IMPLEMENT THIS ENDPOINT
// api/users GET
// api/users/${userId} GET
// api/users POST
// api/users/{userId} PUT
// api/users/${userId} DELETE
