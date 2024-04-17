/* eslint-disable no-console */
import * as fs from "fs";

import { generateManifest } from "./manifest";
import { updateObject } from "./update-object";

import {
  ConfigType,
  configPath,
  getConfigFile
} from "../../config/get-config-file";

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
      site_name: "VitNode Community",
      site_short_name: "VitNode"
    }
  }
};

(async () => {
  if (!fs.existsSync(configPath)) {
    fs.writeFile(configPath, JSON.stringify(DATA, null, 2), "utf8", err => {
      if (err) throw err;
    });

    await generateManifest(DATA);

    console.log("[VitNode] - Config file has been generated");
  } else {
    console.log("[VitNode] - Config file already exists. Updating...");

    // Update config file
    const config = await getConfigFile();
    const updatedConfig = updateObject(config, DATA);

    fs.writeFile(
      configPath,
      JSON.stringify(updatedConfig, null, 2),
      "utf8",
      err => {
        if (err) throw err;
      }
    );

    await generateManifest(updatedConfig);

    console.log("[VitNode] - Config file has been updated");
  }
})();
