import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHOD } from '../constants';
import { checkParams } from '../utils';
import { endpoints } from './endpoints';

//TODO CHANGE STRUCTURE ROUTER

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  switch (request.method) {
    case HTTP_METHOD.GET:
      if (checkParams(request)) {
        await endpoints.getUsersById(request, response);
      } else {
        await endpoints.getUsers(request, response);
      }
      break;
    case HTTP_METHOD.POST:
      await endpoints.saveUser(request, response);
      break;
    case HTTP_METHOD.PUT:
      break;
    case HTTP_METHOD.DELETE:
      break;
    default:
      break;
  }
};

//TODO ADD HANDLER ERROR

//TODO IMPLEMENT THIS ENDPOINT
// api/users GET
// api/users/${userId} GET
// api/users POST
// api/users/{userId} PUT
// api/users/${userId} DELETE
