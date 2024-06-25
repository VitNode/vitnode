import { join } from "path";
import * as fs from "fs";

import { ConfigType } from "@vitnode/shared";

export const configPath = join(process.cwd(), "config", "config.json");

export const getConfigFile = async () => {
  const file = await fs.promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
