import { join } from "path";
import { promises } from "fs";

import type { ConfigType } from ".";

export const configPath = join(process.cwd(), "config", "config.json");

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
