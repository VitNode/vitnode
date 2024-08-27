import { DATABASE_ENVS } from '@/database/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  dbCredentials: DATABASE_ENVS,
  out: './src/plugins/core/admin/database/migrations/',
  schema: './src/plugins/**/admin/database/schema/*.ts',
});
