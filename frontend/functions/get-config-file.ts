import { promises } from "fs";
import { join } from "path";

export interface ConfigType {
  finished_install: boolean;
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  side_name: string;
}

export const getConfigFile = async () => {
  const configPath = join("config", "config.json");
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
