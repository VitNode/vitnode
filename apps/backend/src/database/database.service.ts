import { Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { schemaDatabase } from "./schema";
import { db } from "./client";

@Injectable()
export class DatabaseService {
  public db: NodePgDatabase<typeof schemaDatabase>;

  constructor() {
    this.db = db;
  }
}
