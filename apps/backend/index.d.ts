// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DatabaseService } from "vitnode-backend";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

import { schemaDatabase } from "@/database/schema";

// Overwrite the DatabaseService class to include the db property
declare module "vitnode-backend" {
  export declare class DatabaseService {
    db: NodePgDatabase<typeof schemaDatabase>;
  }
}
