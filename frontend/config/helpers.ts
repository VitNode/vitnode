import { join } from "path";
import { promises } from "fs";

import { ConfigType } from ".";

export const configPath = join(process.cwd(), "config", "config.json");

export function updateObject<T>(config: T, defaultData: T): T {
  const updatedConfig = config;
  for (const key in defaultData) {
    if (typeof defaultData[key] === "object" && defaultData[key] !== null) {
      if (!config[key]) {
        updatedConfig[key] = {} as T[Extract<keyof T, string>];
      }
      updateObject(config[key], defaultData[key]);
    } else {
      if (!config[key]) {
        updatedConfig[key] = defaultData[key];
      }
    }
  }

  return updatedConfig;
}

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
