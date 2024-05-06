/* eslint-disable no-console */

import * as fs from "fs";
import { join } from "path";

import { migrate } from "drizzle-orm/node-postgres/migrator";

import { updatePlugins } from "./update-plugins";
import { DEFAULT_CONFIG_DATA } from "./default-config-data";

import {
  ConfigType,
  configPath,
  getConfigFile
} from "../../config/get-config-file";
import { db } from "@/plugins/database/client";

(async () => {
  // Update config file
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    ...DEFAULT_CONFIG_DATA
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
          try {
            await migrate(db, {
              migrationsFolder: migrationPath
            });
          } catch (error) {
            console.error(`[VitNode] - Error running migration for ${plugin}`);
            console.error(error);

            throw error;
          }

          console.log(
            `[VitNode] - Running migration for ${plugin} - ${migrationPath}`
          );
        })
    );
  });

  // Update plugins
  await updatePlugins({ db });

  console.log("[VitNode] - Successfully finished build");
})();
