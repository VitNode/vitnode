import type { Config } from 'drizzle-kit';

export default {
  schema: './src/**/database/schema/*.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    host: 'localhost',
    port: 5432,
    user: 'root',
    password: 'root',
    database: 'vitnode'
  }
} satisfies Config;
