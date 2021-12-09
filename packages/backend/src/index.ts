import { EzAuth } from '@ezbackend/auth';
import { EzBackend } from '@ezbackend/common';
import { EzCors } from '@ezbackend/cors';
import { EzDbUI } from '@ezbackend/db-ui';
import { EzOpenAPI } from '@ezbackend/openapi';
import { user } from './models/user';

const app = new EzBackend();

// ---Plugins---
app.addApp(new EzOpenAPI());
app.addApp(new EzDbUI());
app.addApp(new EzCors());
app.addApp(new EzAuth());
// ---Plugins---

app.addApp(user, { prefix: 'user' });

app.start({
  backend: {
    typeorm: {
      type: 'postgres',
      url: process.env.DATABASE_URL && process.env.DATABASE_URL,
      synchronize: true,
    },
    listen: {
      port: 8000,
    },
  },
  auth: {
    successRedirectURL: 'http://localhost:3000',
  },
});
