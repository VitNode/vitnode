import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { DatabaseModuleArgs } from "./database.module";
import { createClientDatabase } from "./client";

@Injectable()
export class DatabaseService {
  public db: NodePgDatabase<any>;

  constructor(
    @Inject("DATABASE_MODULE_OPTIONS")
    private readonly options: DatabaseModuleArgs
  ) {
    const client = createClientDatabase({
      schemaDatabase: {},
      config: this.options.config
    });

    this.db = client.db;
  }
}
