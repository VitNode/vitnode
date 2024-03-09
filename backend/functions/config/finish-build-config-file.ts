/* eslint-disable no-console */
import * as fs from "fs";
import { join } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { ConfigType, configPath, getConfigFile } from "./get-config-file";

import { db, poolDB } from "@/modules/database/client";

(async () => {
  // Update config file
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
      "core",
      "admin",
      "database",
      "migrations"
    )
  });

  fs.readdir(join(process.cwd(), "modules"), async (err, files) => {
    await Promise.all(
      files
        .filter(
          file => !["database", "modules.module.ts", "core"].includes(file)
        )
        .map(async file => {
          // Check if migration folder exists
          const migrationPath = join(
            process.cwd(),
            "modules",
            file,
            "admin",
            "database",
            "migrations"
          );

          if (!fs.existsSync(migrationPath)) {
            return;
          }

          // Run migration
          await migrate(db, {
            migrationsFolder: migrationPath
          });
          await poolDB.end();
        })
    );
  });

  console.log("[VitNode] - Successfully finished build");
})();
