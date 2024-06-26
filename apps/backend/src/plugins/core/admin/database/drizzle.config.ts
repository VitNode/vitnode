// ! DO NOT REMOVE, MODIFY OR MOVE THIS FILE!!!

import { defineConfig } from 'drizzle-kit';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
// @ts-ignore
import { DATABASE_ENVS } from '@/database/client';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: DATABASE_ENVS,
  schema: './src/plugins/core/admin/database/schema/*.ts',
  out: './src/plugins/core/admin/database/migrations/',
});
