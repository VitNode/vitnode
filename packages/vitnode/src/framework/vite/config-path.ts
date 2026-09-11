import { existsSync } from "node:fs";
import { join } from "node:path";

export const ROOT_CONFIG_FILENAME = "vitnode.config.ts";

export const rootConfigPathFor = (appRoot: string): string => {
  const atRoot = join(appRoot, ROOT_CONFIG_FILENAME);

  return existsSync(atRoot)
    ? atRoot
    : join(appRoot, "src", ROOT_CONFIG_FILENAME);
};

export const rootConfigCandidatesFor = (appRoot: string): string[] => [
  join(appRoot, ROOT_CONFIG_FILENAME),
  join(appRoot, "src", ROOT_CONFIG_FILENAME),
];
