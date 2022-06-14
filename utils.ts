import { IncomingMessage } from 'http';
import url from 'url';
import { ICandidate } from './interfaces';
import { RIGHT_PATH, URL_WITH_ID } from './constants';
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
