/* eslint-disable no-console */
import { createJiti } from "jiti";
import { existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { pathToFileURL } from "node:url";

import type {
  VitNodeApiConfig,
  VitNodeConfig,
  VitNodeWebPublicOptions,
} from "../src/config/types.js";
import type {
  AppMessagesMap,
  LocaleMessagesMap,
} from "../src/lib/i18n/types.js";

import { configFromLoadedModule } from "../src/config/loaded.js";
import {
  resolveApiConfig,
  resolveWebServerConfig,
} from "../src/config/server.js";

type ConfigName = "api.config" | "config" | "server.config";

export interface VitNodeWebConfigView extends VitNodeWebPublicOptions {
  i18n: VitNodeConfig["app"]["i18n"];
  metadata: VitNodeConfig["app"]["metadata"];
  plugins: { pluginId: string }[];
}

export interface VitNodeServerConfigView {
  config: VitNodeWebConfigView;
  messages?: AppMessagesMap;
  packageMessages: Record<string, LocaleMessagesMap | undefined>;
}

type ConfigType<T extends ConfigName> = T extends "config"
  ? VitNodeWebConfigView
  : T extends "server.config"
    ? VitNodeServerConfigView
    : VitNodeApiConfig;

export const ROOT_CONFIG_FILENAME = "vitnode.config.ts";

const SKIPPED_DIRECTORIES = new Set(["build", "dist", "node_modules", "out"]);

export const findConfigFile = (
  baseDir: string,
  filename: string,
  maxDepth = 4,
): null | string => {
  const searchRecursively = (dir: string, depth: number): null | string => {
    if (depth > maxDepth) return null;

    try {
      for (const candidate of [
        join(dir, filename),
        join(dir, "src", filename),
      ]) {
        if (existsSync(candidate)) return candidate;
      }

      for (const item of readdirSync(dir)) {
        if (item.startsWith(".") || SKIPPED_DIRECTORIES.has(item)) continue;

        const itemPath = join(dir, item);

        try {
          if (statSync(itemPath).isDirectory()) {
            const found = searchRecursively(itemPath, depth + 1);
            if (found) return found;
          }
        } catch {
          continue;
        }
      }
    } catch {
      return null;
    }

    return null;
  };

  return searchRecursively(baseDir, 0);
};

export interface LoadedVitNodeProject {
  appDir: string;
  config: VitNodeConfig;
  configPath: string;
}

const appDirOf = (configPath: string): string => {
  const configDir = dirname(configPath);

  return configDir.endsWith(`/src`) || configDir.endsWith("\\src")
    ? dirname(configDir)
    : configDir;
};

export const loadVitNodeProject = async ({
  baseDir = process.cwd(),
}: { baseDir?: string } = {}): Promise<LoadedVitNodeProject | null> => {
  const configPath = findConfigFile(baseDir, ROOT_CONFIG_FILENAME);

  if (configPath === null) return null;

  const jiti = createJiti(pathToFileURL(configPath).href, {
    interopDefault: true,
    moduleCache: false,
  });
  const loaded: unknown = await jiti.import(configPath);
  const source = relative(process.cwd(), configPath) || configPath;

  return {
    appDir: appDirOf(configPath),
    config: configFromLoadedModule(loaded, source),
    configPath,
  };
};

const webView = (config: VitNodeConfig): VitNodeWebConfigView => ({
  ...config.web?.public,
  i18n: config.app.i18n,
  metadata: config.app.metadata,
  plugins: config.plugins.map(plugin => ({ pluginId: plugin.pluginId })),
});

const projectionFor = async <T extends ConfigName>(
  project: LoadedVitNodeProject,
  type: T,
): Promise<ConfigType<T> | null> => {
  const { appDir, config } = project;

  if (type === "config") {
    return (config.web ? webView(config) : null) as ConfigType<T> | null;
  }

  if (type === "server.config") {
    if (!config.web) return null;

    const resolved = await resolveWebServerConfig(config);

    return {
      config: webView(config),
      messages: resolved.messages,
      packageMessages: resolved.packageMessages,
    } as ConfigType<T>;
  }

  if (!config.api) return null;

  return (await resolveApiConfig(config, { appRoot: appDir })) as ConfigType<T>;
};

export async function getConfig<T extends ConfigName = "config">(args: {
  baseDir?: string;
  optional: true;
  type?: T;
}): Promise<ConfigType<T> | null>;
export async function getConfig<T extends ConfigName = "config">(args?: {
  baseDir?: string;
  optional?: false;
  type?: T;
}): Promise<ConfigType<T>>;
export async function getConfig<T extends ConfigName = "config">({
  baseDir,
  type = "config" as T,
  optional = false,
}: {
  baseDir?: string;
  optional?: boolean;
  type?: T;
} = {}): Promise<ConfigType<T> | null> {
  const cwd = baseDir ?? process.cwd();

  let project: LoadedVitNodeProject | null;

  try {
    project = await loadVitNodeProject({ baseDir: cwd });
  } catch (error) {
    if (optional) return null;
    console.error("Failed to load config:", error);
    process.exit(1);
  }

  if (project === null) {
    if (optional) return null;
    console.error(`Config file not found: ${ROOT_CONFIG_FILENAME}`);
    console.error(
      `Searched recursively in ${cwd} (excluding node_modules, .*, dist, build, out)`,
    );
    process.exit(1);
  }

  try {
    const projection = await projectionFor(project, type);

    if (projection === null) {
      if (optional) return null;
      console.error(
        `${relative(cwd, project.configPath)} declares no ${type === "api.config" ? "API runtime (`api: defineApiRuntime(...)`)" : "web runtime (`web: defineWebRuntime(...)`)"}.`,
      );
      process.exit(1);
    }

    return projection;
  } catch (error) {
    if (optional) return null;
    console.error("Failed to load config:", error);
    process.exit(1);
  }
}
