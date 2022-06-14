import { IncomingMessage, ServerResponse } from 'http';
import { HTTP_METHOD } from '../constants';
import { checkParams, checkPathname } from '../utils';
import { endpoints } from './endpoints';

export const router = async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
  if (!checkPathname(request)) {
    return await endpoints.notFound(request, response);
  }

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
      await endpoints.updateUser(request, response);
      break;
    case HTTP_METHOD.DELETE:
      await endpoints.deleteUser(request, response);
      break;
    default:
      await endpoints.notFound(request, response);
      break;
  }
};
