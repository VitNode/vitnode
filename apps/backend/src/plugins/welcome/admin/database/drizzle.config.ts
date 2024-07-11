// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!
import { defineConfig } from 'drizzle-kit';

import { DATABASE_ENVS } from '@/database';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: DATABASE_ENVS,
  schema: './plugins/welcome/admin/database/schema/*.ts',
  out: './plugins/welcome/admin/database/migrations/',
});
