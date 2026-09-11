import type { Config } from "drizzle-kit";

import { config as loadDotenv } from "dotenv";
import { defineConfig } from "drizzle-kit";
import { existsSync, readdirSync, realpathSync } from "node:fs";
import { join, resolve } from "node:path";

import type { VitNodeConfig } from "./config/types";

export const DEFAULT_POSTGRES_URL =
  "postgresql://root:root@localhost:5432/vitnode";

export const databaseUrlFromEnv = (
  env: Readonly<Record<string, string | undefined>> = process.env,
): string => env.POSTGRES_URL ?? DEFAULT_POSTGRES_URL;

type DrizzleConfigInput = Omit<Config, "dialect"> & {
  dbCredentials?: { url: string };
  dialect?: "postgresql";
};

type VitNodeDrizzleConfigArgs = DrizzleConfigInput & { config: VitNodeConfig };

export const defineVitNodeDrizzleConfig = ({
  config,
  ...args
}: VitNodeDrizzleConfigArgs) => {
  loadDotenv({ quiet: true });

  const pluginId = config.plugins.map(plugin => plugin.pluginId);

  const findMonorepoRoot = (startPath: string): null | string => {
    let currentPath = startPath;
    while (currentPath !== resolve(currentPath, "..")) {
      const turboConfigPath = join(currentPath, "turbo.json");

      if (existsSync(turboConfigPath)) {
        return currentPath;
      }
      currentPath = resolve(currentPath, "..");
    }

    return null;
  };

  const checkPluginPath = (basePath: string, itemId: string): null | string => {
    const pluginPath = resolve(
      basePath,
      "node_modules",
      itemId,
      "dist",
      "src",
      "database",
    );

    if (!existsSync(pluginPath)) {
      return null;
    }

    try {
      const files = readdirSync(pluginPath);
      const hasSchemaFiles = files.some(file => file.endsWith(".js"));
      if (!hasSchemaFiles) return null;

      return realpathSync(pluginPath);
    } catch {
      return null;
    }
  };

  const cwd = process.cwd();
  const monorepoRoot = findMonorepoRoot(cwd);

  const pluginDirs = new Set<string>();

  for (const itemId of ["@vitnode/core", ...pluginId]) {
    const cwdPath = checkPluginPath(cwd, itemId);
    if (cwdPath) pluginDirs.add(cwdPath);

    if (monorepoRoot && monorepoRoot !== cwd) {
      const rootPath = checkPluginPath(monorepoRoot, itemId);
      if (rootPath) pluginDirs.add(rootPath);
    }
  }

  const pluginPaths = [...pluginDirs].map(dir =>
    join(dir, "*.js").replace(/\\/g, "/"),
  );

  let baseSchemas: string[] = [];
  if (Array.isArray(args.schema)) {
    baseSchemas = args.schema;
  } else if (args.schema) {
    baseSchemas = [args.schema];
  }

  return defineConfig({
    dialect: "postgresql",
    dbCredentials: { url: databaseUrlFromEnv() },
    ...args,
    schema: [...baseSchemas, ...pluginPaths],
  });
};
