import { join } from "path";

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from "dotenv";

import { schemaDatabase } from "./schema";

if (
  !(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
) {
  dotenv.config({
    path: join(process.cwd(), "..", ".env")
  });
}

export const DATABASE_ENVS = {
  host: process.env.DB_HOST ?? "localhost",
  port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "root",
  database: process.env.DB_DATABASE ?? "vitnode"
};

export const poolDB = new Pool(DATABASE_ENVS);

export const db = drizzle(poolDB, { schema: schemaDatabase });
