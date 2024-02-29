/* eslint-disable no-console */
import * as fs from "fs";

import { ConfigType, configPath, getConfigFile } from "./get-config-file";

(async () => {
  const config = await getConfigFile();

  const newData: ConfigType = {
    ...config,
    rebuild_required: {
      langs: false,
      plugins: false,
      themes: false
    }
  };

  fs.writeFile(configPath, JSON.stringify(newData, null, 2), "utf8", err => {
    if (err) throw err;
  });

  console.log("[VitNode] - Successfully finished build");
})();
