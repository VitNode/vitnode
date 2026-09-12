import { createRequire } from "node:module";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import type { BuildPluginApiReturn } from "../api/lib/plugin";
import type {
  AnyVitNodePluginDefinition,
  VitNodeApiConfig,
  VitNodeApiPluginEntry,
  VitNodeConfig,
  VitNodeRuntimeContext,
  VitNodeRuntimeMode,
  VitNodeWebServerConfig,
} from "./types";

import { VitNodeConfigError } from "./errors";
import { API_PLUGIN_ENTRY_EXPORT, pluginCapability } from "./plugin";
import { projectPublicConfig } from "./public";

export type ModuleImporter = (specifier: string) => Promise<unknown>;

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const describeError = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const runtimeMode = (value: string | undefined): VitNodeRuntimeMode => {
  if (value === "production" || value === "test") return value;

  return "development";
};

export const createRuntimeContext = (
  env: Readonly<Record<string, string | undefined>> = process.env,
  overrides: Partial<VitNodeRuntimeContext> = {},
): VitNodeRuntimeContext => ({
  env: overrides.env ?? env,
  mode: overrides.mode ?? runtimeMode(env.NODE_ENV),
});

export const createAppModuleImporter = (
  appRoot: string = process.cwd(),
): ModuleImporter => {
  const requireFromApp = createRequire(
    pathToFileURL(join(appRoot, "package.json")).href,
  );

  return async specifier => {
    let resolved: string | undefined;

    try {
      resolved = requireFromApp.resolve(specifier);
    } catch {
      resolved = undefined;
    }

    return resolved === undefined
      ? await import(/* @vite-ignore */ specifier)
      : await import(/* @vite-ignore */ pathToFileURL(resolved).href);
  };
};

const NOT_FOUND_CODES = new Set([
  "ERR_MODULE_NOT_FOUND",
  "ERR_PACKAGE_PATH_NOT_EXPORTED",
  "MODULE_NOT_FOUND",
]);

const isSpecifierNotFound = (
  error: unknown,
  specifier: string,
  pluginId: string,
): boolean => {
  if (!isRecord(error) || typeof error.code !== "string") return false;
  if (!NOT_FOUND_CODES.has(error.code)) return false;

  const message = describeError(error);
  const subpath = specifier.slice(pluginId.length);

  return (
    message.includes(specifier) ||
    message.includes(pluginId) ||
    (subpath !== "" && message.includes(subpath))
  );
};

const readApiPluginEntry = (
  loaded: unknown,
): undefined | VitNodeApiPluginEntry => {
  if (!isRecord(loaded)) return undefined;

  const entry = loaded[API_PLUGIN_ENTRY_EXPORT];

  return typeof entry === "function"
    ? (entry as VitNodeApiPluginEntry)
    : undefined;
};

const assertBuiltApiPlugin = (
  plugin: AnyVitNodePluginDefinition,
  specifier: string,
  built: unknown,
): BuildPluginApiReturn => {
  if (
    !isRecord(built) ||
    typeof built.pluginId !== "string" ||
    !isRecord(built.hono)
  ) {
    throw new VitNodeConfigError(
      "api-entry-invalid",
      `\`${API_PLUGIN_ENTRY_EXPORT}\` in "${specifier}" did not return an API plugin. It has to return \`buildApiPlugin({ pluginId: "${plugin.pluginId}", modules })\`.`,
    );
  }

  if (built.pluginId !== plugin.pluginId) {
    throw new VitNodeConfigError(
      "api-entry-invalid",
      `\`${API_PLUGIN_ENTRY_EXPORT}\` in "${specifier}" built an API plugin for "${built.pluginId}", but the descriptor that advertised it is "${plugin.pluginId}". The two have to agree.`,
    );
  }

  return built as unknown as BuildPluginApiReturn;
};

export const resolvePluginApiEntry = async (
  plugin: AnyVitNodePluginDefinition,
  importer: ModuleImporter,
  context: VitNodeRuntimeContext,
): Promise<BuildPluginApiReturn | undefined> => {
  const { declared, specifier } = pluginCapability(plugin, "api");

  let loaded: unknown;

  try {
    loaded = await importer(specifier);
  } catch (error) {
    if (!declared && isSpecifierNotFound(error, specifier, plugin.pluginId)) {
      return undefined;
    }

    throw new VitNodeConfigError(
      "api-entry-invalid",
      `Plugin "${plugin.pluginId}" advertises its API at "${specifier}", which could not be imported: ${describeError(error)}`,
      { cause: error },
    );
  }

  const entry = readApiPluginEntry(loaded);

  if (entry === undefined) {
    if (!declared) return undefined;

    throw new VitNodeConfigError(
      "api-entry-invalid",
      `Plugin "${plugin.pluginId}" advertises its API at "${specifier}", but that module does not export \`${API_PLUGIN_ENTRY_EXPORT}\`. Export \`const ${API_PLUGIN_ENTRY_EXPORT} = defineApiPluginFactory({ pluginId, modules })\` from \`@vitnode/core/api/lib/plugin\` in it.`,
    );
  }

  return assertBuiltApiPlugin(
    plugin,
    specifier,
    await entry(plugin.options, context),
  );
};

export const resolvePluginApiEntries = async (
  plugins: readonly AnyVitNodePluginDefinition[],
  importer: ModuleImporter,
  context: VitNodeRuntimeContext,
): Promise<BuildPluginApiReturn[]> => {
  const resolved: BuildPluginApiReturn[] = [];

  for (const plugin of plugins) {
    const built = await resolvePluginApiEntry(plugin, importer, context);

    if (built !== undefined) resolved.push(built);
  }

  return resolved;
};

export interface ResolveApiConfigOptions {
  appRoot?: string;
  context?: Partial<VitNodeRuntimeContext>;
  importer?: ModuleImporter;
}

export const resolveApiConfig = async (
  config: VitNodeConfig,
  {
    appRoot,
    context: contextOverrides,
    importer,
  }: ResolveApiConfigOptions = {},
): Promise<VitNodeApiConfig> => {
  if (config.api === undefined) {
    throw new VitNodeConfigError(
      "api-runtime-missing",
      "This config has no API runtime. Add `api: defineApiRuntime(async ({ env }) => ({ dbProvider, ... }))` to `vitnode.config.ts`, or point this frontend at a separately deployed API with `VITNODE_API_URL`.",
    );
  }

  const context = createRuntimeContext(process.env, contextOverrides);
  const runtime = await config.api.load(context);

  if (!isRecord(runtime) || !isRecord(runtime.dbProvider)) {
    throw new VitNodeConfigError(
      "api-runtime-invalid",
      "The API runtime factory has to return `{ dbProvider, ... }` - a Drizzle client is the one thing every API needs.",
    );
  }

  const { i18n, metadata, ...rest } = runtime;

  return {
    ...rest,
    i18n: i18n ?? config.app.i18n,
    metadata: metadata ?? config.app.metadata,
    plugins: await resolvePluginApiEntries(
      config.plugins,
      importer ?? createAppModuleImporter(appRoot),
      context,
    ),
    public: projectPublicConfig(config),
  };
};

export interface ResolveWebServerConfigOptions {
  context?: Partial<VitNodeRuntimeContext>;
}

export const resolveWebServerConfig = async (
  config: VitNodeConfig,
  { context: contextOverrides }: ResolveWebServerConfigOptions = {},
): Promise<VitNodeWebServerConfig> => {
  if (config.web === undefined) {
    throw new VitNodeConfigError(
      "web-runtime-missing",
      "This config has no web runtime. Add `web: defineWebRuntime({ public, server })` to `vitnode.config.ts` before rendering pages from it.",
    );
  }

  const context = createRuntimeContext(process.env, contextOverrides);
  const server = (await config.web.loadServer?.(context)) ?? {};

  return {
    i18n: config.app.i18n,
    kind: "vitnode.web-server-config",
    ...(server.messages === undefined ? {} : { messages: server.messages }),
    metadata: config.app.metadata,
    packageMessages: server.packageMessages ?? {},
    plugins: config.plugins.map(plugin => ({ pluginId: plugin.pluginId })),
  };
};
