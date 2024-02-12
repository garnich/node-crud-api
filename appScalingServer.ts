import cluster from 'cluster';
import { createServer } from 'http';
import { cpus } from 'os';
import process from 'process';
import { config } from 'dotenv';
import { routesHandler } from './src/helpers/routesHandlerHelpers';

config();

const numCPUs = cpus().length;
const PORT = process.env.PORT ?? 4000

if (cluster.isPrimary) {
  cluster.schedulingPolicy = cluster.SCHED_RR;

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code) => {
    
    if (code && !worker.exitedAfterDisconnect) {
      console.error(`Worker ${worker.process.pid} crashed. Starting a new one, code: ${code}`)

      cluster.fork()
    }
  });
} else {
  const app = createServer(async (request, response): Promise<void> => {
    await routesHandler(request, response);
  });

  app.listen(PORT)

  app.listen(Number(PORT) + (cluster.worker?.id ?? process.pid))

  console.log(`Worker ${process.pid} at 'http://localhost:${Number(PORT) + (cluster.worker?.id ?? process.pid)}`);
}