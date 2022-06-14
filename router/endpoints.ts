import { IUser } from '../interfaces';
import usersController from '../controller/users-controller';
import { STATUS_CODE } from '../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { getParams } from '../utils';

export const endpoints = {
  getUsers: async (request: IncomingMessage, response: ServerResponse) => {
    try {
      const users: IUser[] = await usersController.getAllUsers();
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ users }));
    } catch (e: unknown) {
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR);
      response.end(JSON.stringify({ message: 'INTERNAL_SERVER_ERROR' }));
    }
  },
  getUsersById: async (request: IncomingMessage, response: ServerResponse) => {
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
};
