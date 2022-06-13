import { createServer, IncomingMessage, ServerResponse } from 'http';
import { STATUS_CODE } from './constants';
import 'dotenv/config'

const PORT: string = process.env.PORT;

const requestListener = (req: IncomingMessage, res: ServerResponse): void => {
  res.writeHead(STATUS_CODE.OK);
};

const server = createServer(requestListener);
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
