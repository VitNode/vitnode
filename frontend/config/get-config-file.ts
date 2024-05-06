import { promises } from "fs";
import { join } from "path";

export interface ConfigType {
  editor: {
    allow_head_h1: boolean;
    files: {
      allow_type: "all" | "images_videos" | "images" | "none";
    };
    sticky: boolean;
  };
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  settings: {
    general: {
      site_name: string;
      site_short_name: string;
    };
  };
}

export const configPath = join("config", "config.json");

export const getConfigFile = async () => {
  const file = await promises.readFile(configPath, "utf8");

  return JSON.parse(file) as ConfigType;
};
