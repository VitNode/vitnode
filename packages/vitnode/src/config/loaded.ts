import type { VitNodeConfig } from "./types";

import { isVitNodeConfig } from "./define";
import { VitNodeConfigError } from "./errors";

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const looksLikeConfigAttempt = (value: unknown): boolean =>
  isRecord(value) && ("app" in value || "kind" in value || "plugins" in value);

export const configFromLoadedModule = (
  loaded: unknown,
  source: string,
): VitNodeConfig => {
  if (!isRecord(loaded)) {
    throw new VitNodeConfigError(
      "config-invalid",
      `${source} did not evaluate to a module.`,
    );
  }

  const candidates = [
    loaded,
    isRecord(loaded.default) ? loaded.default : undefined,
  ];

  for (const candidate of candidates) {
    if (candidate === undefined) continue;
    if (isVitNodeConfig(candidate)) return candidate;
    if (isVitNodeConfig(candidate.default)) return candidate.default;
  }

  if (looksLikeConfigAttempt(loaded.default) || "vitNodeConfig" in loaded) {
    throw new VitNodeConfigError(
      "config-invalid",
      `${source} does not export a VitNode config built by \`defineVitNodeConfig\`. Replace \`buildConfig\`, \`buildServerConfig\` and \`buildApiConfig\` with one \`export default defineVitNodeConfig({ app, plugins, api, web })\` from \`@vitnode/core/config\`.`,
    );
  }

  throw new VitNodeConfigError(
    "config-invalid",
    `${source} does not export a VitNode config. It has to \`export default defineVitNodeConfig({ ... })\`, because the configured plugins are what every projection is generated from.`,
  );
};
