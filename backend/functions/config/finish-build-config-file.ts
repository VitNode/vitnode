/* eslint-disable no-console */

import * as fs from "fs";
import { join } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { ConfigType, configPath, getConfigFile } from "./get-config-file";
import { updatePlugins } from "./update-plugins";

import { db } from "@/plugins/database/client";

(async () => {
  // Update config file
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    rebuild_required: {
      langs: false,
      plugins: false,
      themes: false
    }
  };
  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");

  // Migration for database
  await migrate(db, {
    migrationsFolder: join(
      process.cwd(),
      "plugins",
      "core",
      "admin",
      "database",
      "migrations"
    )
  });

  fs.readdir(join(process.cwd(), "plugins"), async (err, plugins) => {
    await Promise.all(
      plugins
        .filter(
          plugin => !["database", "plugins.module.ts", "core"].includes(plugin)
        )
        .map(async plugin => {
          // Check if migration folder exists
          const migrationPath = join(
            process.cwd(),
            "plugins",
            plugin,
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

          console.log(`[VitNode] - Running migration for ${plugin}`);
        })
    );
  });

  // Update plugins
  await updatePlugins({ db });

  console.log("[VitNode] - Successfully finished build");
})();
