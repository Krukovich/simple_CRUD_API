import { IncomingMessage, ServerResponse } from 'http';
import usersController from '../controller/users-controller';
import { ICandidate } from '../interfaces';
import { HTTP_METHOD, STATUS_CODE } from '../constants';
import { checkParams, getRequestData } from '../utils';
import { endpoints } from './endpoints';

//TODO CHANGE STRUCTURE ROUTER

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  switch (request.method) {
    case HTTP_METHOD.GET:
      if (checkParams(request.url)) {
        await endpoints.getUsersById(request, response);
      } else {
        await endpoints.getUsers(request, response);
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

//TODO ADD HANDLER ERROR

//TODO IMPLEMENT THIS ENDPOINT
// api/users GET
// api/users/${userId} GET
// api/users POST
// api/users/{userId} PUT
// api/users/${userId} DELETE
