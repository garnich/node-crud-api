import { createServer } from 'http';
import { env } from 'process';
import { config } from 'dotenv';

config();

const PORT = env.PORT || 3000;

const server = createServer(async (request, response) => {
    response.write(JSON.stringify('Server test response'));
    response.end();
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
