import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";

interface Args<T> {
  config: PoolConfig;
  schemaDatabase: T;
}

export const DATABASE_ENVS = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_DATABASE || "vitnode",
};

export function createClientDatabase<
  T extends Record<string, unknown> = Record<string, unknown>,
>({ config, schemaDatabase }: Args<T>) {
  const poolDB = new Pool(config);
  const db = drizzle<T>(poolDB, { schema: schemaDatabase });

  return {
    db,
    poolDB,
  };
}
