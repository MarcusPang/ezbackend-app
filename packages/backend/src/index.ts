import { EzAuth } from '@ezbackend/auth';
import {
  EzApp,
  EzBackend,
  EzBackendOpts,
  RecursivePartial
} from '@ezbackend/common';
import { EzCors } from '@ezbackend/cors';
import { EzDbUI } from '@ezbackend/db-ui';
import { EzOpenAPI } from '@ezbackend/openapi';
import { comment, follower, post, user } from './models';

const app = new EzBackend();

// plugins
app.addApp(new EzOpenAPI());
app.addApp(new EzDbUI());
app.addApp(new EzCors());
app.addApp(new EzAuth());


// entities
app.addApp(user, { prefix: 'user' });
app.addApp(post, { prefix: 'post' });
app.addApp(comment, { prefix: 'comment' });
app.addApp(follower, { prefix: 'follower' });

const test = new EzApp()

const PORT = process.env.PORT || 4000;

// orm setup
let ormConfig: RecursivePartial<EzBackendOpts>['backend']['typeorm'];
if (process.env.DATABASE_URL) {
  ormConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    extra: process.env.NODE_ENV === 'production' && {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  };
} else {
  ormConfig = {
    type: 'better-sqlite3',
    synchronize: true,
    database: 'db.sqlite',
  };
}

app.start({
  backend: {
    typeorm: ormConfig,
    listen: {
      address: '0.0.0.0',
      port: PORT,
    },
    fastify: {
      trustProxy: true,
    },
  },
  auth: {
    successRedirectURL: process.env.AUTH_SUCCESS_REDIRECT,
  },
});



// const clientSocket = clientIO(`http://localhost:${PORT}`, {
//   reconnectionDelay: 0,
//   forceNew: true,
//   transports: ['websocket'],
// });

// clientSocket.connect();
// clientSocket.once('connect', () => {
//   return clientSocket;
// });

// clientSocket.on('connection', (socket) => {
//   console.log(socket);
//   return socket
// });
