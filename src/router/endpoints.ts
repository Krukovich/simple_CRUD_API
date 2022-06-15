import { ICandidate, IUser } from '../../interfaces';
import usersController from '../controller/users-controller';
import { ERROR_MESSAGE, STATUS_CODE } from '../../constants';
import { IncomingMessage, ServerResponse } from 'http';
import { getParams, getRequestData, prepareResponse, uuidValidateV4 } from '../../utils';

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
      prepareResponse(response, { statusCode: STATUS_CODE.OK, data: users, message: undefined });
    } catch (e: unknown) {
      prepareResponse(response, {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        data: undefined,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
    }
  },
  getUsersById: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const user: IUser = await usersController.getUserById(id);

        if (user) {
          prepareResponse(response, { statusCode: STATUS_CODE.OK, data: user, message: undefined });
        } else {
          prepareResponse(response, {
            statusCode: STATUS_CODE.NOT_FOUND,
            data: undefined,
            message: ERROR_MESSAGE.USER_NOT_FOUND,
          });
        }
      } else {
        prepareResponse(response, {
          statusCode: STATUS_CODE.BAD_REQUEST,
          data: undefined,
          message: ERROR_MESSAGE.UUID_IS_INVALID,
        });
      }
    } catch (e: unknown) {
      prepareResponse(response, {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        data: undefined,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
    }
  },
  saveUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const { username, age, hobbies }: ICandidate = await getRequestData(request);

      if (!username || !age || !hobbies) {
        prepareResponse(response, {
          statusCode: STATUS_CODE.BAD_REQUEST,
          data: undefined,
          message: ERROR_MESSAGE.REQUIRED_FIELDS,
        });
        return;
      }
      const newUser: IUser = await usersController.createUser({ username, age, hobbies });
      prepareResponse(response, { statusCode: STATUS_CODE.CREATED, data: newUser, message: undefined });
    } catch (e: unknown) {
      prepareResponse(response, {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        data: undefined,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
    }
  },
  updateUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const { username, age, hobbies }: ICandidate = await getRequestData(request);

        if (!username || !age || !hobbies) {
          prepareResponse(response, {
            statusCode: STATUS_CODE.BAD_REQUEST,
            data: undefined,
            message: ERROR_MESSAGE.REQUIRED_FIELDS,
          });
          return;
        }
        const newUser: IUser = await usersController.updateUser(id, { username, age, hobbies });

        if (newUser) {
          prepareResponse(response, { statusCode: STATUS_CODE.OK, data: newUser, message: undefined });
        } else {
          prepareResponse(response, {
            statusCode: STATUS_CODE.NOT_FOUND,
            data: undefined,
            message: ERROR_MESSAGE.USER_NOT_FOUND,
          });
        }
      } else {
        prepareResponse(response, {
          statusCode: STATUS_CODE.BAD_REQUEST,
          data: undefined,
          message: ERROR_MESSAGE.UUID_IS_INVALID,
        });
      }
    } catch (e: unknown) {
      prepareResponse(response, {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        data: undefined,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
    }
  },
  deleteUser: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    try {
      const id: string = getParams(request);

      if (uuidValidateV4(id)) {
        const user: IUser = await usersController.deleteUser(id);

        if (user) {
          prepareResponse(response, {
            statusCode: STATUS_CODE.NOT_FOUND,
            data: undefined,
            message: ERROR_MESSAGE.DELETE_USER,
          });
        } else {
          prepareResponse(response, {
            statusCode: STATUS_CODE.NOT_FOUND,
            data: undefined,
            message: ERROR_MESSAGE.USER_NOT_FOUND,
          });
        }
      } else {
        prepareResponse(response, {
          statusCode: STATUS_CODE.BAD_REQUEST,
          data: undefined,
          message: ERROR_MESSAGE.UUID_IS_INVALID,
        });
      }
    } catch (e: unknown) {
      prepareResponse(response, {
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
        data: undefined,
        message: ERROR_MESSAGE.SERVER_ERROR,
      });
    }
  },
  notFound: async (request: IncomingMessage, response: ServerResponse): Promise<void> => {
    prepareResponse(response, {
      statusCode: STATUS_CODE.NOT_FOUND,
      data: undefined,
      message: ERROR_MESSAGE.ENDPOINT_NOT_FOUND,
    });
  },
};
