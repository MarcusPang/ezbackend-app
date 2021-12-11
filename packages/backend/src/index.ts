import { EzAuth } from '@ezbackend/auth';
import { EzBackend, EzBackendOpts, RecursivePartial } from '@ezbackend/common';
import { EzCors } from '@ezbackend/cors';
import { EzDbUI } from '@ezbackend/db-ui';
import { EzOpenAPI } from '@ezbackend/openapi';
import { user, post, comment, follower } from './models';

const app = new EzBackend();

// ---Plugins---
app.addApp(new EzOpenAPI());
app.addApp(new EzDbUI());
app.addApp(new EzCors());
app.addApp(new EzAuth());
// ---Plugins---

// entities
app.addApp(user, { prefix: 'user' });
app.addApp(post, { prefix: 'post' });
app.addApp(comment, { prefix: 'comment' });
app.addApp(follower, { prefix: 'follower' });

// orm setup
let ormConfig: RecursivePartial<EzBackendOpts>['backend']['typeorm'];
if (process.env.DATABASE_URL) {
  ormConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
  };
} else {
  ormConfig = {
    type: 'better-sqlite3',
    synchronize: true,
    database: 'db.sqlite',
  };
}

app.start({
  backend: { typeorm: ormConfig },
  auth: {
    successRedirectURL: 'http://localhost:3000',
  },
});
