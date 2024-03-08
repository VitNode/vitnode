/* eslint-disable no-console */
import * as fs from "fs";

import { ConfigType, configPath, getConfigFile } from "./get-config-file";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, poolDB } from "@/modules/database/client";
import { join } from "path";

(async () => {
  const config = await getConfigFile();

  const newData: ConfigType = {
    ...config,
    rebuild_required: {
      langs: true,
      plugins: true,
      themes: true
    }
  };

  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");

  // Migration for database
  await migrate(db, {
    migrationsFolder: join(
      process.cwd(),
      "modules",
      "admin",
      "database",
      "migrations"
    )
  });
  await poolDB.end();

  console.log("[VitNode] - Successfully finished build");
})();
