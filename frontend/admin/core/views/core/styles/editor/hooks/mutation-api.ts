"use server";

import * as fs from "fs";

import {
  configPath,
  getConfigFile,
  type ConfigType
} from "@/config/get-config-file";

export const mutationApi = async (variables: ConfigType["editor"]) => {
  const config = await getConfigFile();
  const newData: ConfigType = {
    ...config,
    editor: variables
  };

  fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), "utf8");
};
