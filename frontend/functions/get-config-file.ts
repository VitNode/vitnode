import { promises } from "fs";
import { join } from "path";

export interface ConfigType {
  editor: {
    sticky: boolean;
  };
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  side_name: string;
}

export const configPath = join("config", "config.json");

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
