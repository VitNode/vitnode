#!/usr/bin/env ts-node-script
/* eslint-disable no-console */

import * as fs from "fs";
import { join } from "path";

import { copyDatabaseSchema } from "./copy-database-core";
import { generateManifest } from "./generate-manifest";
import { generateMigrations } from "./generate-migrations";
import { updatePlugins } from "./update-plugins";
import { createClientDatabase } from "../src/database/client";
import coreSchemaDatabase from "../src/templates/core/admin/database";

const init = async () => {
  const pluginsPath = join(process.cwd(), "src", "plugins");
  const corePluginPath = join(pluginsPath, "core");
  if (!fs.existsSync(pluginsPath)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${pluginsPath}"`,
    );
    process.exit(1);
  }
  if (!fs.existsSync(corePluginPath)) {
    console.error("⛔️ Plugin 'core' not found in 'src/plugins' directory.");
    process.exit(1);
  }

  const DATABASE_ENVS = {
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT ? +process.env.DB_PORT : 5432,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "vitnode",
  };
  const database = createClientDatabase({
    config: DATABASE_ENVS,
    schemaDatabase: coreSchemaDatabase,
  });

  console.log(
    "\x1b[34m%s\x1b[0m",
    "[VitNode]",
    "[1/4] Setup the project. Copying the database core schema...",
  );
  copyDatabaseSchema({ corePluginPath });

  console.log(
    "\x1b[34m%s\x1b[0m",
    "[VitNode]",
    "[2/4] Generating the manifest files...",
  );
  generateManifest();

  console.log(
    "\x1b[34m%s\x1b[0m",
    "[VitNode]",
    "[3/4] Generating migrations...",
  );
  await generateMigrations({ pluginsPath, db: database.db });

  console.log("\x1b[34m%s\x1b[0m", "[VitNode]", "[4/4] Updating plugins...");
  await updatePlugins({ pluginsPath, db: database.db });

  await database.poolDB.end();
  console.log("\x1b[34m%s\x1b[0m", "[VitNode]", "✅ Project setup complete.");
  process.exit(0);
};

if (process.argv[2] === "init") {
  init();
}
