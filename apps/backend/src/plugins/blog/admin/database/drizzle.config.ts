// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import { defineConfig } from 'drizzle-kit';

import { DATABASE_ENVS } from '@/database/client';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: DATABASE_ENVS,
  schema: './src/plugins/blog/admin/database/schema/*.ts',
  out: './src/plugins/blog/admin/database/migrations/',
});
