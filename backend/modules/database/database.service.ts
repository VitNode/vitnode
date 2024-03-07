import { Injectable } from "@nestjs/common";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { schemaDatabase } from "./schema";

@Injectable()
export class DatabaseService {
  public db: NodePgDatabase<typeof schemaDatabase>;

  constructor() {
    const envs = {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME
    };

    const pool = new Pool({
      host: envs.host ?? "localhost",
      port: envs.port ? +envs.port : 5432,
      user: envs.user ?? "root",
      password: envs.password ?? "root",
      database: envs.name ?? "vitnode"
    });

    this.db = drizzle(pool, { schema: schemaDatabase });
  }
}
