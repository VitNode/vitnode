import { join } from "path";
import * as fs from "fs";

export interface ConfigType {
  applications: string[];
  finished_install: boolean;
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  side_name: string;
}

export const configPath = join(
  process.cwd(),
  "..",
  "frontend",
  "config",
  "config.json"
);

export const getConfigFile = async () => {
  const config = fs.readFileSync(configPath, "utf8");
  const data: ConfigType = JSON.parse(config);

  return data;
};
