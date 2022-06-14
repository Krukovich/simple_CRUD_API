import { ICandidate, IUser } from '../interfaces';
import usersController from '../controller/users-controller';
import { STATUS_CODE } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { getParams, getRequestData } from '../utils';

//TODO ADD LOGIC FOR RETURN USER DATA AFTER PUT AND POST REQUEST
//TODO ADD LOGIC FOR SHOW RIGHT ERROR STATUS AND ERROR MESSAGE
//TODO ADD UNIT TEST AND LIB
//TODO CHANGE WEBPACK SETTINGS FOR CREATE BUILD FOLDER AND RUN APPLICATION
//TODO ADD LOGIC FOR START APPLICATION WITH WORKER

export const endpoints: {
  getUsers: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  getUsersById: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  saveUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  updateUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
  deleteUser: (request: IncomingMessage, response: ServerResponse) => Promise<void>;
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
  updateUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);
      const { username, age, hobbies }: ICandidate = await getRequestData(request);
      await usersController.updateUser(id, { username, age, hobbies });
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end();
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
  deleteUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);
      await usersController.deleteUser(id);
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end();
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
};
