import { ICandidate, IUser } from '../interfaces';
import usersController from '../controller/users-controller';
import { STATUS_CODE } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { getParams, getRequestData } from '../utils';

export const endpoints: {
  getUsers: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  getUsersById: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  saveUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
} = {
  getUsers: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const users: IUser[] = await usersController.getAllUsers();
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ users }));
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
  getUsersById: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);
      const user: IUser = await usersController.getUserById(id);
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ user }));
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
  saveUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const { username, age, hobbies }: ICandidate = await getRequestData(request);
      await usersController.createUser({ username, age, hobbies });
      response.writeHead(STATUS_CODE.CREATED);
      response.end();
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
};
