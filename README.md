## Description

A simple Node.js application in which CRUD API is implemented to receive users and work with them, delete, edit, add

| App used         |
| ---------------- |
| REST             |
| simple unit test |

## Installation

```bash
$ npm install
```

## Running the app

```bash
$ npm run start:prod
```

## Test

```bash
$ npm run test
```

## Horizontal scaling

There could be implemented horizontal scaling for application (there is a npm script start:multi that starts multiple instances of your application using the Node.js Cluster API (equal to the number of logical processor cores on the host machine) with a load balancer that distributes requests across them)

```bash
$ npm run start:multi
```

To test this functionality, I suggest you

1. install the `autocanno` package globally `npm install -g autocannon`
2. start application `npm run start:prod`
3. write this command in terminal `autocannon -g 200 -d 10 http://localhost:3000/api/user`
4. After that, you will see in the terminal something like this page where you need to pay attention to the AVG field, the time spent processing the request

| Stat      | 1%      | 2.5%    | 50%     | 97.5%   | Avg     | Stdev   | Min     |
| --------- | ------- | ------- | ------- | ------- | ------- | ------- | ------- |
| Req/Sec   | 19535   | 19535   | 38815   | 38911   | 36690.4 | 5746.13 | 19533   |
| Bytes/Sec | 4.02 MB | 4.02 MB | 7.99 MB | 8.01 MB | 7.56 MB | 1.18 MB | 4.02 MB |

5. after that stop server run command `npm run start:multi` and repeat step number 3 wait for the result and this number should increase, which indicates that our productivity has increased

## License

Nest is [MIT licensed](LICENSE).
