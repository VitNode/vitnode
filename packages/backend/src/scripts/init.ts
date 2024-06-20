#!/usr/bin/env node

import { join } from "path";
import * as fs from "fs";

/* eslint-disable no-console */

const copyDatabaseSchema = ({ corePluginPath }: { corePluginPath: string }) => {
  const currentPathToSchema = join(
    __dirname,
    "..",
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

  const userPathToSchema = join(corePluginPath, "admin", "database");
  fs.cpSync(currentPathToSchema, userPathToSchema, { recursive: true });
};

export const init = () => {
  const corePluginPath = join(process.cwd(), "src", "plugins", "core");

  if (!fs.existsSync(corePluginPath)) {
    console.error("Plugin 'core' not found in 'src/plugins' directory.");
    process.exit(1);
  }

  // Copy the schema from the template to the core plugin
  copyDatabaseSchema({ corePluginPath });

  console.log("Hello, world!", process.cwd());
};

if (process.argv[2] === "init") {
  init();
}
