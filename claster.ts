import cluster from 'cluster';
import * as os from 'os';

if (cluster.isMaster) {
  const cpusCount: number = os.cpus().length;
  console.log(`CPUs ${cpusCount}`);
  console.log(`Application has started on host CPU number ${cpusCount}`);

  for (let i = 0; i < cpusCount - 1; i++) {
    cluster.fork();
  }

  if (cluster.isWorker) {
    require('./index');
  }
}
