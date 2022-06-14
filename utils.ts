import { IncomingMessage } from 'http';
import url from 'url';
import { ICandidate } from './interfaces';
import { URL_WITH_ID } from './constants';

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
