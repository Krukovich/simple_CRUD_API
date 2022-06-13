import { IncomingMessage } from 'http';
import { ICandidate } from './interfaces';

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
