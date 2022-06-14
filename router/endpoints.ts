import { ICandidate, IUser } from '../interfaces';
import usersController from '../controller/users-controller';
import { ERROR_MESSAGE, STATUS_CODE } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { getParams, getRequestData, uuidValidateV4 } from '../utils';

//TODO ADD UNIT TEST AND LIB
//TODO CHANGE WEBPACK SETTINGS FOR CREATE BUILD FOLDER AND RUN APPLICATION
//TODO ADD LOGIC FOR START APPLICATION WITH WORKER

export const endpoints: {
  getUsers: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  getUsersById: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  saveUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  updateUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  deleteUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  notFound: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
} = {
  getUsers: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const users: IUser[] = await usersController.getAllUsers();
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ users }));
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: ERROR_MESSAGE.SERVER_ERROR }));
    }
  },
  getUsersById: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const user: IUser = await usersController.getUserById(id);

        if (user) {
          response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ user }));
        } else {
          response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }));
        }
      } else {
        response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: ERROR_MESSAGE.UUID_IS_INVALID }));
      }
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: ERROR_MESSAGE.SERVER_ERROR }));
    }
  },
  saveUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const { username, age, hobbies }: ICandidate = await getRequestData(request);

      if (!username || !age || !hobbies) {
        response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: ERROR_MESSAGE.REQUIRED_FIELDS }));
        return;
      }
      const newUser: IUser = await usersController.createUser({ username, age, hobbies });
      response.writeHead(STATUS_CODE.CREATED, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ newUser }));
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: ERROR_MESSAGE.SERVER_ERROR }));
    }
  },
  updateUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const { username, age, hobbies }: ICandidate = await getRequestData(request);

        if (!username || !age || !hobbies) {
          response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: ERROR_MESSAGE.REQUIRED_FIELDS }));
          return;
        }
        const newUser: IUser = await usersController.updateUser(id, { username, age, hobbies });

        if (newUser) {
          response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ newUser }));
        } else {
          response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }));
        }
      } else {
        response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: ERROR_MESSAGE.UUID_IS_INVALID }));
      }
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: ERROR_MESSAGE.SERVER_ERROR }));
    }
  },
  deleteUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const user: IUser = await usersController.deleteUser(id);

        if (user) {
          response.writeHead(STATUS_CODE.NO_CONTENT, { 'Content-Type': 'application/json' });
          response.end();
        } else {
          response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
          response.end(JSON.stringify({ message: ERROR_MESSAGE.USER_NOT_FOUND }));
        }
      } else {
        response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ message: ERROR_MESSAGE.UUID_IS_INVALID }));
      }
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: ERROR_MESSAGE.SERVER_ERROR }));
    }
  },
  notFound: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: ERROR_MESSAGE.ENDPOINT_NOT_FOUND }));
  },
};
