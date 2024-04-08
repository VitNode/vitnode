/* eslint-disable no-console */
import * as fs from "fs";

import { ConfigType, configPath } from "./get-config-file";

const DATA: ConfigType = {
  side_name: "VitNode Community",
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  },
  editor: {
    sticky: false
  }
};

if (!fs.existsSync(configPath)) {
  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), "utf8", err => {
    if (err) throw err;
  });

  console.log("[VitNode] - Config file has been generated");
} else {
  // TODO: Update config
  console.log("[VitNode] - Config file already exists. Skipping...");
}
