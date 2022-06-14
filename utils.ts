import { IncomingMessage, ServerResponse } from 'http';
import url from 'url';
import { ICandidate, IUser } from './interfaces';
import { RIGHT_PATH, STATUS_CODE, URL_WITH_ID } from './constants';
import { validate as uuidValidate } from 'uuid';
import { version as uuidVersion } from 'uuid';

export const getRequestData = (request: IncomingMessage): Promise<ICandidate> => {
  return new Promise((resolve, reject) => {
    try {
      let body: string = '';
      request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const checkParams = (request: IncomingMessage): boolean => {
  const baseURI: url.UrlWithParsedQuery = url.parse(request.url, true);
  const path: string[] = baseURI.pathname.split('/');
  return path.slice(1).length === URL_WITH_ID;
};

export const getParams = (request: IncomingMessage): string => {
  const baseURI: url.UrlWithParsedQuery = url.parse(request.url, true);
  const path: string[] = baseURI.pathname.split('/');
  return path.slice(1)[2];
};

export const uuidValidateV4 = (uuid: string): boolean => {
  return uuidValidate(uuid) && uuidVersion(uuid) === 4;
};

export const checkPathname = (request: IncomingMessage): boolean => {
  const pathname: string = url.parse(request.url).pathname.trim();
  const path: string[] = pathname.split('/');
  return path.slice(0, 3).join('/') === RIGHT_PATH;
};

export const prepareResponse = (
  response: ServerResponse,
  { statusCode, data, message }: { statusCode: number; data?: ICandidate | IUser[]; message?: string },
): void => {
  switch (statusCode) {
    case STATUS_CODE.OK:
      response.writeHead(STATUS_CODE.OK, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ data }));
      return;
    case STATUS_CODE.CREATED:
      response.writeHead(STATUS_CODE.CREATED, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ data }));
      return;
    case STATUS_CODE.BAD_REQUEST:
      response.writeHead(STATUS_CODE.BAD_REQUEST, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: message }));
      return;
    case STATUS_CODE.NOT_FOUND:
      response.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: message }));
      return;
    case STATUS_CODE.NO_CONTENT:
      response.writeHead(STATUS_CODE.NO_CONTENT, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: message }));
      return;
    case STATUS_CODE.INTERNAL_SERVER_ERROR:
      response.writeHead(STATUS_CODE.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify({ message: message }));
      return;
    default:
      break;
  }
};
