import { join } from "path";

export interface ConfigType {
  applications: string[];
  finished_install: boolean;
  languages: {
    default: string;
    locales: {
      enabled: boolean;
      key: string;
    }[];
  };
  side_name: string;
  theme_id: number;
}

export const configPath = join("..", "frontend", "config", "config.json");
