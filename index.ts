import { createServer } from 'http';
import { env } from 'process';
import { config } from 'dotenv';
import { routesHandler } from './src/helpers/routesHandlerHelpers';

config();

const PORT = env.PORT ?? 3000;

export const server = createServer(async (request, response): Promise<void> => {
  await routesHandler(request, response);
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
