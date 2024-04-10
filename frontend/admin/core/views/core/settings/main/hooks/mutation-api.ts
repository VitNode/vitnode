"use server";

import * as fs from "fs";

import {
  configPath,
  getConfigFile,
  type ConfigType
} from "@/config/get-config-file";

export const mutationApi = async (
  variables: ConfigType["settings"]["general"]
) => {
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    settings: {
      ...config.settings,
      general: variables
    }
  };

  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");
};
