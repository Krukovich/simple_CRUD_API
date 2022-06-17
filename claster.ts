import cluster from 'cluster';
import * as os from 'os';

if (cluster.isMaster) {
  const cpusCount: number = os.cpus().length;
  console.log(`CPUs ${cpusCount}`);
  console.log(`Application has started on host CPU number ${cpusCount} - 1 for main thread`);

  Array(cpusCount - 1)
    .fill('')
    .forEach(() => {
      cluster.fork();
    });
}

if (cluster.isWorker) {
  import('./index');
}
