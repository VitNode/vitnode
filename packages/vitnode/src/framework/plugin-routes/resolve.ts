import type { AnyVitNodePluginDefinition } from "../../config/types.js";
import type { ResolvedPluginRoutesModule } from "./types.js";

import { configFromLoadedModule } from "../../config/loaded.js";
import { PLUGIN_ID_PATTERN } from "../../config/plugin.js";
import { PLUGIN_ROUTES_ERROR_PREFIX as ERROR_PREFIX } from "./diagnostics.js";

export { toSingleQuotedLiteral } from "../../config/literal.js";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const assertPluginId = (pluginId: string, source: string): string => {
  if (!PLUGIN_ID_PATTERN.test(pluginId)) {
    throw new Error(
      `${ERROR_PREFIX} ${source} declares the plugin id ${JSON.stringify(pluginId)}, which is not a package name. A plugin's routes module is imported from the plugin's package, so the id has to be one.`,
    );
  }

  return pluginId;
};

export const pluginsFromLoadedConfig = (
  loaded: unknown,
  source: string,
): AnyVitNodePluginDefinition[] =>
  [...configFromLoadedModule(loaded, source).plugins].map(plugin => {
    assertPluginId(plugin.pluginId, source);

    return plugin;
  });

export const pluginIdsFromLoadedConfig = (
  loaded: unknown,
  source: string,
): string[] =>
  pluginsFromLoadedConfig(loaded, source).map(plugin => plugin.pluginId);

export const routeDeclarationsFromRoutesModule = (
  loaded: unknown,
  source: string,
): unknown[] => {
  if (!isRecord(loaded) || !("routes" in loaded)) {
    throw new Error(
      `${ERROR_PREFIX} ${source} does not export \`routes\`. A plugin's routes module is \`export const routes = definePluginRoutes([...])\`.`,
    );
  }

  const { routes } = loaded;

  if (!Array.isArray(routes)) {
    throw new Error(`${ERROR_PREFIX} \`routes\` in ${source} is not an array.`);
  }

  const legacy = (routes as unknown[]).filter(
    route => isRecord(route) && typeof route.entry === "string",
  );

  if (legacy.length > 0) {
    throw new Error(
      `${ERROR_PREFIX} ${source} exports the old flat route manifest - ${String(legacy.length)} route${legacy.length === 1 ? "" : "s"} declaring an \`entry\`. Plugin routes are now a nested tree: replace each record with \`page()\`, \`layout()\` or \`index()\` from \`@vitnode/core/routing\`, move \`entry\` to \`component: lazy(() => import("./pages/..."))\`, rename \`namespaces\` to \`messages\`, and drop \`id\`, \`kind\`, \`parentId\` and \`searchEntry\`. See https://vitnode.com/docs/dev/plugins/routes.`,
    );
  }

  return routes as unknown[];
};

export const sortAndAssertUniquePlugins = (
  modules: readonly ResolvedPluginRoutesModule[],
): ResolvedPluginRoutesModule[] => {
  const sorted = [...modules].sort((a, b) => {
    if (a.pluginId === b.pluginId) return 0;

    return a.pluginId < b.pluginId ? -1 : 1;
  });

  const duplicates = sorted
    .filter(
      (module, index) =>
        index > 0 && module.pluginId === sorted[index - 1].pluginId,
    )
    .map(module => module.pluginId);

  if (duplicates.length > 0) {
    throw new Error(
      `${ERROR_PREFIX} Two plugins claim the same id: ${[...new Set(duplicates)].map(id => JSON.stringify(id)).join(", ")}. A plugin id is the package name, so an app cannot configure one twice.`,
    );
  }

  return sorted;
};
