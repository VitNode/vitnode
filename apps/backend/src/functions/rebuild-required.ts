import * as fs from "fs";

import { CustomError } from "vitnode-backend";

import { ConfigType, configPath, getConfigFile } from "@/config";

export const setRebuildRequired = async ({
  set
}: {
  set: "langs" | "plugins";
}) => {
  const config = getConfigFile();

  const newData: ConfigType = {
    ...config,
    rebuild_required: {
      ...config.rebuild_required,
      [set]: true
    }
  };

  fs.writeFile(configPath, JSON.stringify(newData, null, 2), "utf8", err => {
    if (err)
      throw new CustomError({
        code: "ERR_CONFIG_WRITE",
        message: "Error writing to config file"
      });
  });
};
