import { join } from "path";
import * as fs from "fs";

import { PluginInfoJSONType } from "@/plugins/core/admin/plugins/helpers/files/create/contents";

export interface ConfigType {
  editor: {
    allow_head_h1: boolean;
    sticky: boolean;
  };
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
    themes: boolean;
  };
  settings: {
    general: {
      side_name: string;
    };
  };
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

export const getCoreInfo = async () => {
  const path = join(process.cwd(), "plugins", "core");
  const config = fs.readFileSync(join(path, "plugin.json"), "utf8");
  const data: PluginInfoJSONType = JSON.parse(config);

  const pathVersionsJSON = join(path, "versions.json");
  const versionsFile = await fs.promises.readFile(pathVersionsJSON, "utf8");
  const versions: { [key: string]: string } = JSON.parse(versionsFile);

  // Find the latest version
  const latestVersion = Object.keys(versions).sort().reverse()[0];
  const version = versions[latestVersion];

  return {
    ...data,
    version
  };
};
