/* eslint-disable no-console */
import * as fs from "fs";
import { join } from "path";

import type { ConfigType } from "./get-config-file";

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

const configPath = join("config", "config.json");
if (!fs.existsSync(configPath)) {
  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), "utf8", err => {
    if (err) throw err;
  });

  console.log("[First Install VitNode] - Config file has been generated");
} else {
  console.log("[First Install VitNode] - Config file already exists");
}
