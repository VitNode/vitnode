import { resolve } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db, poolDB } from "@/plugins/database/client";

(async () => {
  await migrate(db, { migrationsFolder: resolve(__dirname, "migrations") });
  await poolDB.end();
})();
