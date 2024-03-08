import { resolve } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, poolDB } from "@/modules/database/client";

(async () => {
  await migrate(db, { migrationsFolder: resolve(__dirname, "migrations") });
  await poolDB.end();
})();
