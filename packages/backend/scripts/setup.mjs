#!/usr/bin/env node
// @ts-check
/* eslint-disable no-console */

import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Copy the database schema from the template to the core plugin
 * @param {string} corePluginPath
 */
const copyDatabaseSchema = corePluginPath => {
  const currentPathToSchema = path.join(
    __dirname,
    "..",
    "src",
    "templates",
    "core",
    "admin",
    "database",
  );
  if (!fs.existsSync(currentPathToSchema)) {
    console.log(
      `⛔️ Database schema not found in 'templates/core/admin/database' directory. "${currentPathToSchema}"`,
    );
    process.exit(1);
  }

  const userPathToSchema = path.join(corePluginPath, "admin", "database");
  fs.cpSync(currentPathToSchema, userPathToSchema, { recursive: true });
};

export const init = () => {
  console.log("\x1b[34m%s\x1b[0m", "[VitNode]", "🛠️ Setup the project...");
  const corePluginPath = path.join(process.cwd(), "src", "plugins", "core");

  if (!fs.existsSync(corePluginPath)) {
    console.error("⛔️ Plugin 'core' not found in 'src/plugins' directory.");
    process.exit(1);
  }

  // Copy the schema from the template to the core plugin
  copyDatabaseSchema(corePluginPath);

  console.log(
    "\x1b[34m%s\x1b[0m",
    "[VitNode]",
    "✅ Project setup complete. Running the project...",
  );
  process.exit(0);
};

if (process.argv[2] === "init") {
  init();
}
