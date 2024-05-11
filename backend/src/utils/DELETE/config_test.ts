import { promises } from "fs";
import { join } from "path";
import { ConfigType } from "./config";

export const configPath = join(
  process.cwd(),
  "..",
  "shared",
  "config",
  "config.json"
);

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
