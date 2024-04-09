/* eslint-disable no-console */
import * as fs from "fs";

import { ConfigType, configPath } from "../../config/get-config-file";

const DATA: ConfigType = {
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  },
  editor: {
    sticky: true,
    allow_head_h1: false
  },
  settings: {
    general: {
      side_name: "VitNode Community"
    }
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
