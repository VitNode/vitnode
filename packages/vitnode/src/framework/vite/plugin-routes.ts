import type { Plugin } from "vite";

import { createJiti } from "jiti";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { readFile, unlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import {
  dirname,
  join,
  relative,
  resolve as resolvePath,
  sep,
} from "node:path";
import { pathToFileURL } from "node:url";

import type {
  AnyVitNodePluginDefinition,
  VitNodeConfig,
  VitNodePluginCapability,
} from "../../config/types";
import type { ResolvedAdminNavModule } from "../admin-nav";
import type { ResolvedContentRegistryModule } from "../content-registry";
import type {
  CompiledPluginRoutes,
  HostRoutePath,
  PluginRouteCompilerSource,
} from "../plugin-routes";

import { VitNodeConfigError } from "../../config/errors";
import { configFromLoadedModule } from "../../config/loaded";
import {
  capabilitySpecifier,
  PLUGIN_CAPABILITY_SUBPATHS,
} from "../../config/plugin";
import {
  generatePublicConfigSource,
  projectPublicConfig,
} from "../../config/public";
import { generateAdminNavSource } from "../admin-nav";
import { generateContentRegistrySource } from "../content-registry";
import {
  assertPluginId,
  compilePluginRoutes,
  hostRoutePathsFromFiles,
  lazyImportSpecifier,
  routeDeclarationsFromRoutesModule,
} from "../plugin-routes";
import { rootConfigPathFor } from "./config-path";
import { createGenerationQueue } from "./generation-queue";
import { versionedModuleUrl } from "./module-version";

const LEGACY_MANIFEST_SUBPATH = "routes/manifest";

const ERROR_PREFIX = "[VitNode plugin routes]";

const DEFAULT_HOST_ROUTES_DIR = join("src", "routes");

export interface VitNodePluginRoutesOptions {
  appRoot: string;

  hostRoutesDir?: null | string;
}

const pathsFor = (appRoot: string) => ({
  config: rootConfigPathFor(appRoot),

  adminNav: join(appRoot, "src", "admin-nav.gen.ts"),

  contentRegistry: join(appRoot, "src", "content-registry.gen.ts"),

  publicConfig: join(appRoot, "src", "vitnode.public.gen.ts"),

  registry: join(appRoot, "src", "plugin-routes.gen.ts"),

  staleManifest: join(appRoot, "src", "plugin-route-manifest.gen.ts"),

  routerConfig: join(appRoot, "tsr.config.json"),
});

export type PackageFileResolver = (specifier: string) => null | string;

const resolverFor = (appRoot: string): PackageFileResolver => {
  const requireFromApp = createRequire(join(appRoot, "package.json"));

  return specifier => {
    try {
      const file = requireFromApp.resolve(specifier);

      return existsSync(file) ? file : null;
    } catch {
      return null;
    }
  };
};

export const readConfiguredConfig = async (
  appRoot: string,
  configPath: string = pathsFor(appRoot).config,
): Promise<VitNodeConfig> => {
  if (!existsSync(configPath)) {
    throw new VitNodeConfigError(
      "config-invalid",
      `No vitnode.config.ts found at ${relative(appRoot, configPath) || configPath}. Create one with \`export default defineVitNodeConfig({ ... })\` from \`@vitnode/core/config\`.`,
    );
  }

  const jiti = createJiti(pathToFileURL(join(appRoot, "package.json")).href, {
    interopDefault: true,
    moduleCache: false,
  });

  const source = relative(appRoot, configPath);
  const config = configFromLoadedModule(await jiti.import(configPath), source);

  config.plugins.forEach(plugin => assertPluginId(plugin.pluginId, source));

  return config;
};

export const configuredPluginIds = async (appRoot: string): Promise<string[]> =>
  (await readConfiguredConfig(appRoot)).plugins.map(plugin => plugin.pluginId);

const unresolvableCapability = (
  plugin: AnyVitNodePluginDefinition,
  capability: VitNodePluginCapability,
  specifier: string,
): VitNodeConfigError =>
  new VitNodeConfigError(
    "capability-unresolvable",
    `Plugin "${plugin.pluginId}" advertises its ${capability} module at "${specifier}", which does not resolve from this app. Check the plugin's package.json \`exports\` and that its build output is up to date.`,
  );

export interface ResolvedCapabilityModule {
  pluginId: string;
  specifier: string;
}

export const readPluginCapabilityModules = <T extends ResolvedCapabilityModule>(
  plugins: readonly AnyVitNodePluginDefinition[],
  capability: Exclude<VitNodePluginCapability, "api">,
  resolvePackageFile: PackageFileResolver,
): { modules: T[]; watch: string[] } => {
  const modules: T[] = [];
  const watch: string[] = [];

  for (const plugin of plugins) {
    const specifier = capabilitySpecifier(plugin, capability);

    if (specifier === undefined) continue;

    const file = resolvePackageFile(specifier);

    if (file === null) {
      if (plugin.discovery === "declared") {
        throw unresolvableCapability(plugin, capability, specifier);
      }

      continue;
    }

    modules.push({ pluginId: plugin.pluginId, specifier } as T);
    watch.push(file);
  }

  return { modules, watch };
};

const conventionPlugin = (pluginId: string): AnyVitNodePluginDefinition => ({
  discovery: "convention",
  entries: {},
  kind: "vitnode.plugin",
  options: {},
  pluginId,
});

const capabilityForSubpath = (
  subpath: string,
): Exclude<VitNodePluginCapability, "api"> => {
  const found = (
    Object.entries(PLUGIN_CAPABILITY_SUBPATHS) as [
      VitNodePluginCapability,
      string,
    ][]
  ).find(([capability, value]) => value === subpath && capability !== "api");

  if (found === undefined) {
    throw new Error(
      `${ERROR_PREFIX} "${subpath}" is not a plugin frontend capability subpath.`,
    );
  }

  return found[0] as Exclude<VitNodePluginCapability, "api">;
};

export const readOptionalPluginModules = <
  T extends { pluginId: string; specifier: string },
>(
  pluginIds: readonly string[],
  subpath: string,
  resolvePackageFile: PackageFileResolver,
): { modules: T[]; watch: string[] } =>
  readPluginCapabilityModules<T>(
    pluginIds.map(conventionPlugin),
    capabilityForSubpath(subpath),
    resolvePackageFile,
  );

const readPluginRoutes = async (
  plugin: AnyVitNodePluginDefinition,
  resolvePackageFile: PackageFileResolver,
): Promise<{ source: PluginRouteCompilerSource; watch: null | string }> => {
  const specifier = capabilitySpecifier(plugin, "routes");

  if (specifier === undefined) {
    return { source: { pluginId: plugin.pluginId }, watch: null };
  }

  const file = resolvePackageFile(specifier);

  if (file === null) {
    if (plugin.discovery === "declared") {
      throw unresolvableCapability(plugin, "routes", specifier);
    }

    assertNoLegacyRouteManifest(plugin.pluginId, resolvePackageFile);

    return { source: { pluginId: plugin.pluginId }, watch: null };
  }

  const loaded: unknown = await import(
    versionedModuleUrl(file, statSync(file))
  );

  return {
    source: {
      pluginId: plugin.pluginId,
      routes: routeDeclarationsFromRoutesModule(loaded, specifier),
      routesSpecifier: specifier,
    },
    watch: file,
  };
};

const assertNoLegacyRouteManifest = (
  pluginId: string,
  resolvePackageFile: PackageFileResolver,
): void => {
  const legacy = `${pluginId}/${LEGACY_MANIFEST_SUBPATH}`;

  if (resolvePackageFile(legacy) === null) return;

  throw new Error(
    `${ERROR_PREFIX} Plugin "${pluginId}" exports "${legacy}" but no "${pluginId}/${PLUGIN_CAPABILITY_SUBPATHS.routes}". Plugin routes are now a nested tree in the plugin's own \`src/routes.ts\`: export \`routes = definePluginRoutes([...])\` built from \`page()\`, \`layout()\` and \`index()\`, with each module named by \`component: lazy(() => import("./pages/..."))\` instead of an \`entry\` string. See https://vitnode.com/docs/dev/plugins/routes.`,
  );
};

interface HostRoutesConfig {
  dir: null | string;
  ignore: null | RegExp;
}

const hostRoutesConfigFor = (
  appRoot: string,
  configured: null | string | undefined,
): HostRoutesConfig => {
  if (configured === null) return { dir: null, ignore: null };

  const declared = ((): { ignore?: unknown; routes?: unknown } => {
    try {
      const parsed: unknown = JSON.parse(
        readFileSync(pathsFor(appRoot).routerConfig, "utf8"),
      );

      if (typeof parsed !== "object" || parsed === null) return {};

      const config = parsed as {
        routeFileIgnorePattern?: unknown;
        routesDirectory?: unknown;
      };

      return {
        ignore: config.routeFileIgnorePattern,
        routes: config.routesDirectory,
      };
    } catch {
      return {};
    }
  })();

  const ignore = ((): null | RegExp => {
    if (typeof declared.ignore !== "string" || declared.ignore.length === 0) {
      return null;
    }

    try {
      return new RegExp(declared.ignore);
    } catch {
      return null;
    }
  })();

  if (configured !== undefined) {
    return { dir: resolvePath(appRoot, configured), ignore };
  }

  return {
    dir:
      typeof declared.routes === "string" && declared.routes.length > 0
        ? resolvePath(appRoot, declared.routes)
        : join(appRoot, DEFAULT_HOST_ROUTES_DIR),
    ignore,
  };
};

const filesUnder = (directory: string, prefix = ""): string[] => {
  const entries = readdirSync(directory, { withFileTypes: true }).sort(
    (a, b) => (a.name < b.name ? -1 : 1),
  );

  return entries.flatMap(entry => {
    if (entry.name.startsWith(".") || entry.name === "node_modules") return [];

    const here = prefix === "" ? entry.name : `${prefix}/${entry.name}`;

    return entry.isDirectory()
      ? filesUnder(join(directory, entry.name), here)
      : [here];
  });
};

const readHostRoutes = (
  appRoot: string,
  { dir, ignore }: HostRoutesConfig,
): HostRoutePath[] => {
  if (dir === null || !existsSync(dir)) return [];

  const prefix = relative(appRoot, dir).replaceAll(sep, "/");
  const files = filesUnder(dir).filter(
    file =>
      ignore === null || !(ignore.test(file) || ignore.test(join(dir, file))),
  );

  return hostRoutePathsFromFiles(files).map(hostRoute => ({
    ...hostRoute,
    file: prefix === "" ? hostRoute.file : `${prefix}/${hostRoute.file}`,
  }));
};

const assertComponentsImportable = (
  compiled: CompiledPluginRoutes,
  routesFiles: ReadonlyMap<string, string>,
): void => {
  for (const route of compiled.manifest) {
    const component = compiled.components.get(route.id);
    const specifier =
      component === undefined ? null : lazyImportSpecifier(component.load);
    const from = routesFiles.get(route.pluginId);

    if (specifier === null || from === undefined) continue;

    const file = resolvePath(dirname(from), specifier);
    const candidates = [
      file,
      `${file}.js`,
      `${file}.mjs`,
      join(file, "index.js"),
    ];

    if (candidates.some(candidate => existsSync(candidate))) continue;

    throw new Error(
      `${ERROR_PREFIX} Plugin "${route.pluginId}" declares the ${route.kind} at "${route.path}" with \`lazy(() => import("${specifier}"))\`, which does not resolve to a file next to ${relative(process.cwd(), from)}. Check the path and that ${route.pluginId}'s build output is up to date.`,
    );
  }
};

export interface DiscoveredProjections {
  adminNav: ResolvedAdminNavModule[];
  compiled: CompiledPluginRoutes;
  contentRegistry: ResolvedContentRegistryModule[];
  publicConfig: string;
  watch: string[];
}

export const discoverProjections = async (
  appRoot: string,
  options: VitNodePluginRoutesOptions,
  {
    onLoaded,
    resolvePackageFile = resolverFor(appRoot),
  }: {
    onLoaded?: (watch: string[]) => void;
    resolvePackageFile?: PackageFileResolver;
  } = {},
): Promise<DiscoveredProjections> => {
  const paths = pathsFor(appRoot);
  const config = await readConfiguredConfig(appRoot, paths.config);
  const { plugins } = config;

  const loaded = await Promise.all(
    plugins.map(async plugin => readPluginRoutes(plugin, resolvePackageFile)),
  );
  const adminNav = readPluginCapabilityModules<ResolvedAdminNavModule>(
    plugins,
    "adminNav",
    resolvePackageFile,
  );
  const contentRegistry =
    readPluginCapabilityModules<ResolvedContentRegistryModule>(
      plugins,
      "adminContent",
      resolvePackageFile,
    );

  const watch = [
    ...loaded.flatMap(({ watch: file }) => file ?? []),
    ...adminNav.watch,
    ...contentRegistry.watch,
  ];

  onLoaded?.(watch);

  const compiled = compilePluginRoutes({
    hostRoutes: readHostRoutes(
      appRoot,
      hostRoutesConfigFor(appRoot, options.hostRoutesDir),
    ),
    sources: loaded.map(({ source }) => source),
  });

  assertComponentsImportable(
    compiled,
    new Map(
      loaded.flatMap(({ source, watch: file }) =>
        file === null ? [] : [[source.pluginId, file] as const],
      ),
    ),
  );

  return {
    adminNav: adminNav.modules,
    compiled,
    contentRegistry: contentRegistry.modules,
    publicConfig: generatePublicConfigSource(projectPublicConfig(config)),
    watch,
  };
};

const writeIfChanged = async (path: string, source: string): Promise<void> => {
  const current = existsSync(path) ? await readFile(path, "utf8") : null;

  if (current !== source) await writeFile(path, source, "utf8");
};

const removeIfPresent = async (path: string): Promise<void> => {
  if (!existsSync(path)) return;

  await unlink(path);
};

export const generatedProjectionPaths = (appRoot: string) => {
  const paths = pathsFor(appRoot);

  return {
    adminNav: paths.adminNav,
    contentRegistry: paths.contentRegistry,
    publicConfig: paths.publicConfig,
    registry: paths.registry,
  };
};

export const writeGeneratedProjections = async (
  appRoot: string,
  options: VitNodePluginRoutesOptions,
  onLoaded?: (watch: string[]) => void,
): Promise<void> => {
  const paths = pathsFor(appRoot);
  const { adminNav, compiled, contentRegistry, publicConfig } =
    await discoverProjections(appRoot, options, { onLoaded });

  await Promise.all([
    writeIfChanged(paths.registry, compiled.source),
    writeIfChanged(paths.adminNav, generateAdminNavSource(adminNav)),
    writeIfChanged(
      paths.contentRegistry,
      generateContentRegistrySource(contentRegistry),
    ),
    writeIfChanged(paths.publicConfig, publicConfig),
    removeIfPresent(paths.staleManifest),
  ]);
};

export const vitNodePluginRoutes = (
  options: VitNodePluginRoutesOptions,
): Plugin => {
  const { appRoot } = options;
  const configPath = pathsFor(appRoot).config;
  const routesDir = hostRoutesConfigFor(appRoot, options.hostRoutesDir).dir;

  return {
    config: async () => {
      await writeGeneratedProjections(appRoot, options);
    },

    configureServer: server => {
      const watched = new Set<string>([configPath]);

      const queue = createGenerationQueue(
        async () =>
          writeGeneratedProjections(appRoot, options, files => {
            files.forEach(file => watched.add(file));
            server.watcher.add(files);
          }),
        error => {
          server.config.logger.error(String(error));
        },
      );

      const isRelevant = (file: string, existenceOnly: boolean): boolean => {
        if (watched.has(file)) return true;
        if (!existenceOnly || routesDir === null) return false;

        return (
          file.startsWith(`${routesDir}${sep}`) && /\.[cm]?[jt]sx?$/.test(file)
        );
      };

      const onExistenceChange = (file: string) => {
        if (isRelevant(file, true)) queue.request();
      };

      server.watcher.add(configPath);
      queue.request();
      server.watcher.on("add", onExistenceChange);
      server.watcher.on("unlink", onExistenceChange);
      server.watcher.on("change", file => {
        if (isRelevant(file, false)) queue.request();
      });
    },
    name: "vitnode:plugin-routes",
  };
};
