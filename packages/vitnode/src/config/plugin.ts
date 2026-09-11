import type {
  AnyVitNodePluginDefinition,
  JsonValue,
  VitNodePluginCapability,
  VitNodePluginDefinition,
  VitNodePluginEntries,
  VitNodePluginInput,
} from "./types";

import { VitNodeConfigError } from "./errors";
import { findNonSerializable, toSerializable } from "./serializable";

export const PLUGIN_ID_PATTERN =
  /^(?:@[A-Za-z0-9][A-Za-z0-9._-]*\/)?[A-Za-z0-9][A-Za-z0-9._-]*$/;

export const PLUGIN_CAPABILITIES = [
  "adminContent",
  "adminNav",
  "api",
  "routes",
] as const satisfies readonly VitNodePluginCapability[];

export const PLUGIN_CAPABILITY_SUBPATHS = {
  adminContent: "admin/content",
  adminNav: "admin/nav",
  api: "config.api",
  routes: "routes",
} as const satisfies Record<VitNodePluginCapability, string>;

export const API_PLUGIN_ENTRY_EXPORT = "apiPlugin";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

export const isValidPluginId = (value: unknown): value is string =>
  typeof value === "string" && PLUGIN_ID_PATTERN.test(value);

export const assertValidPluginId = (
  pluginId: unknown,
  source: string,
): string => {
  if (!isValidPluginId(pluginId)) {
    throw new VitNodeConfigError(
      "plugin-id-invalid",
      `${source} declares the plugin id ${JSON.stringify(pluginId)}, which is not a package name. A plugin's modules are imported from its package, so the id has to be one.`,
    );
  }

  return pluginId;
};

export const isVitNodePluginDefinition = (
  value: unknown,
): value is AnyVitNodePluginDefinition =>
  isRecord(value) &&
  value.kind === "vitnode.plugin" &&
  typeof value.pluginId === "string" &&
  isRecord(value.entries);

export const capabilitySpecifier = (
  plugin: AnyVitNodePluginDefinition,
  capability: VitNodePluginCapability,
): string | undefined => {
  if (plugin.discovery === "declared") return plugin.entries[capability];

  return `${plugin.pluginId}/${PLUGIN_CAPABILITY_SUBPATHS[capability]}`;
};

const describeError = (error: unknown): string =>
  error instanceof Error ? error.message : String(error);

const definedEntries = <T extends object>(input: Partial<T>): Partial<T> =>
  Object.fromEntries(
    Object.entries(input).filter(([, value]) => value !== undefined),
  ) as Partial<T>;

const assertEntries = (
  pluginId: string,
  entries: VitNodePluginEntries,
): VitNodePluginEntries => {
  for (const [capability, specifier] of Object.entries(entries)) {
    if (!PLUGIN_CAPABILITIES.includes(capability as VitNodePluginCapability)) {
      throw new VitNodeConfigError(
        "config-invalid",
        `Plugin "${pluginId}" declares an unknown capability "${capability}". Known capabilities: ${PLUGIN_CAPABILITIES.join(", ")}.`,
      );
    }

    if (typeof specifier !== "string" || specifier.trim() === "") {
      throw new VitNodeConfigError(
        "config-invalid",
        `Plugin "${pluginId}" declares the "${capability}" capability without a module specifier. Use a package subpath such as "${pluginId}/${PLUGIN_CAPABILITY_SUBPATHS[capability as VitNodePluginCapability]}".`,
      );
    }
  }

  return { ...entries };
};

export const serializablePublicOptions = (
  pluginId: string,
  value: unknown,
): JsonValue | undefined => {
  if (value === undefined) return undefined;

  const finding = findNonSerializable(value);

  if (finding) {
    throw new VitNodeConfigError(
      "public-options-not-serializable",
      `Plugin "${pluginId}" exposes public options that cannot reach a browser: at ${finding.path}, ${finding.reason}. Public options are written into the generated public config, so they must be plain JSON.`,
    );
  }

  return toSerializable(value);
};

export type PluginOptionsInput<TOptions extends object> = {
  [K in keyof TOptions]?: TOptions[K] | undefined;
};

export interface PluginFactoryDefinition<
  TOptions extends object,
  TPublicOptions,
> {
  defaults?: TOptions;
  entries?: VitNodePluginEntries;
  parse?: (options: TOptions) => TOptions;
  pluginId: string;
  toPublicOptions?: (options: TOptions) => TPublicOptions;
}

export interface VitNodePluginFactory<TOptions extends object, TPublicOptions> {
  (
    options?: PluginOptionsInput<TOptions>,
  ): VitNodePluginDefinition<TOptions, TPublicOptions>;
  readonly pluginId: string;
}

export const definePluginFactory = <
  TOptions extends object = Record<never, never>,
  TPublicOptions = undefined,
>({
  defaults,
  entries,
  parse,
  pluginId: rawPluginId,
  toPublicOptions,
}: PluginFactoryDefinition<TOptions, TPublicOptions>): VitNodePluginFactory<
  TOptions,
  TPublicOptions
> => {
  const pluginId = assertValidPluginId(rawPluginId, "definePluginFactory");
  const declaredEntries =
    entries === undefined ? undefined : assertEntries(pluginId, entries);

  const factory = (
    input: PluginOptionsInput<TOptions> = {},
  ): VitNodePluginDefinition<TOptions, TPublicOptions> => {
    const merged = {
      ...(defaults ?? {}),
      ...definedEntries(input),
    } as TOptions;

    let options: TOptions;

    try {
      options = parse ? parse(merged) : merged;
    } catch (error) {
      throw new VitNodeConfigError(
        "plugin-options-invalid",
        `Plugin "${pluginId}" rejected its options: ${describeError(error)}`,
        { cause: error },
      );
    }

    const publicOptions = toPublicOptions
      ? (serializablePublicOptions(
          pluginId,
          toPublicOptions(options),
        ) as TPublicOptions)
      : undefined;

    return Object.freeze({
      discovery: declaredEntries === undefined ? "convention" : "declared",
      entries: declaredEntries ?? {},
      kind: "vitnode.plugin",
      options,
      pluginId,
      ...(publicOptions === undefined ? {} : { publicOptions }),
    });
  };

  return Object.assign(factory, { pluginId });
};

export const normalizePluginInput = (
  input: unknown,
  source: string,
): AnyVitNodePluginDefinition => {
  if (isVitNodePluginDefinition(input)) {
    assertValidPluginId(input.pluginId, source);

    return input;
  }

  throw new VitNodeConfigError(
    "config-invalid",
    `${source} is not a VitNode plugin. Register plugins with the factories built by \`definePluginFactory\`, for example \`plugins: [blogPlugin()]\`.`,
  );
};

export const normalizePlugins = (
  plugins: readonly unknown[],
  source: string,
): AnyVitNodePluginDefinition[] => {
  const seen = new Map<string, number>();

  return plugins.map((plugin, index) => {
    const normalized = normalizePluginInput(
      plugin,
      `${source}.plugins[${String(index)}]`,
    );
    const first = seen.get(normalized.pluginId);

    if (first !== undefined) {
      throw new VitNodeConfigError(
        "duplicate-plugin",
        `Plugin "${normalized.pluginId}" is registered twice in ${source}.plugins (at index ${String(first)} and ${String(index)}). Register each plugin once with its factory.`,
      );
    }

    seen.set(normalized.pluginId, index);

    return normalized;
  });
};

export { type VitNodePluginInput };
