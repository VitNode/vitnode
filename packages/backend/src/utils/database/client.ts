import * as dotenv from 'dotenv';
import { drizzle } from 'drizzle-orm/connect';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { join } from 'path';
// import { Pool as NodePgPool } from 'pg';
import { PoolConfig } from 'pg';

dotenv.config({
  path: join(process.cwd(), '..', '..', '.env'),
});

// export type DetermineClient<TSchema extends Record<string, unknown>> = {
//   $client: NodePgPool;
// } & NodePgDatabase<TSchema>;

export type DetermineClient<T extends Record<string, unknown>> =
  NodePgDatabase<T>;

interface Args<T> {
  config: PoolConfig;
  schemaDatabase: T;
}

export const DATABASE_ENVS = {
  host: process.env.DB_HOST ?? 'localhost',
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? 'root',
  database: process.env.DB_DATABASE ?? 'vitnode',
  ssl: process.env.DB_SSL ? process.env.DB_SSL === 'true' : false,
};

export async function createClientDatabase<
  T extends Record<string, unknown> = Record<string, unknown>,
>({ config, schemaDatabase }: Args<T>) {
  const db: DetermineClient<T> = await drizzle<'node-postgres', T>(
    'node-postgres',
    {
      connection: {
        host: DATABASE_ENVS.host,
        port: DATABASE_ENVS.port,
        user: DATABASE_ENVS.user,
        password: DATABASE_ENVS.password,
        database: DATABASE_ENVS.database,
        ssl: DATABASE_ENVS.ssl,
      },
      schema: schemaDatabase,
      ...config,
    },
  );

  return {
    db,
  };
}
