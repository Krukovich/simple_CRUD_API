import { createServer, IncomingMessage, ServerResponse, Server } from 'http';
import { STATUS_CODE } from './constants';
import { router } from './src/router/router';
import 'dotenv/config';

const PORT: string | number = process.env.PORT || 3000;

const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(STATUS_CODE.OK);
};

const server: Server = createServer(requestListener);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

server.on('request', router);
