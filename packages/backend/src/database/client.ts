import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, PoolConfig } from "pg";

interface Args<T> {
  config: PoolConfig;
  schemaDatabase: T;
}

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
