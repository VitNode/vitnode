#!/usr/bin/env node
// @ts-check
/* eslint-disable no-console */

import * as path from "path";
import * as fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 *
 * @param {string} corePluginPath
 */
const copyDatabaseSchema = corePluginPath => {
  const currentPathToSchema = path.join(
    __dirname,
    "..",
    "templates",
    "core",
    "admin",
    "database"
  );
  if (!fs.existsSync(currentPathToSchema)) {
    throw new Error(
      "Database schema not found in 'templates/core/admin/database' directory."
    );
  }

  const userPathToSchema = path.join(corePluginPath, "admin", "database");
  fs.cpSync(currentPathToSchema, userPathToSchema, { recursive: true });
};

export const init = () => {
  const corePluginPath = path.join(process.cwd(), "src", "plugins", "core");

  if (!fs.existsSync(corePluginPath)) {
    console.error("Plugin 'core' not found in 'src/plugins' directory.");
    process.exit(1);
  }

  // Copy the schema from the template to the core plugin
  copyDatabaseSchema(corePluginPath);

  console.log("Hello, world!", process.cwd());
};

if (process.argv[2] === "init") {
  init();
}
