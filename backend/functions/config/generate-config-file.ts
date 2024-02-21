/* eslint-disable no-console */
import * as fs from "fs";

import { ConfigType, configPath } from "./get-config-file";

const DATA: ConfigType = {
  side_name: "VitNode Community",
  applications: ["core", "admin", "forum"],
  finished_install: false,
  rebuild_required: {
    themes: false,
    langs: false,
    plugins: false
  }
};

if (!fs.existsSync(configPath)) {
  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), "utf8", err => {
    if (err) throw err;
  });

  console.log("[VitNode] - Config file has been generated");
} else {
  console.log("[VitNode] - Config file already exists. Skipping...");
}
