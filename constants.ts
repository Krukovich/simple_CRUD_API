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

export const URL_WITH_ID: number = 3;