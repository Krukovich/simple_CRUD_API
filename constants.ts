export const STATUS_CODE: Readonly<{
  OK: 200;
  CREATED: 201;
  NO_CONTENT: 204;
  BAD_REQUEST: 400;
  NOT_FOUND: 404;
  INTERNAL_SERVER_ERROR: 500;
}> = Object.freeze({
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
});

export const HTTP_METHOD: Readonly<{ GET: 'GET'; POST: 'POST'; PUT: 'PUT'; DELETE: 'DELETE' }> = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
});

export const ERROR_MESSAGE: Readonly<{
  USER_NOT_FOUND: 'User not found';
  UUID_IS_INVALID: 'UUID is invalid';
  ENDPOINT_NOT_FOUND: 'Endpoint not found';
  SERVER_ERROR: 'The server was unable to process the request';
  REQUIRED_FIELDS: 'Fields: "username", "age", "hobbies" is required';
}> = Object.freeze({
  USER_NOT_FOUND: 'User not found',
  UUID_IS_INVALID: 'UUID is invalid',
  ENDPOINT_NOT_FOUND: 'Endpoint not found',
  SERVER_ERROR: 'The server was unable to process the request',
  REQUIRED_FIELDS: 'Fields: "username", "age", "hobbies" is required',
});

export const URL_WITH_ID: number = 3;

export const RIGHT_PATH: string = '/api/users';
