/* eslint-disable no-console */
import * as fs from "fs";

import { updateObject } from "../functions/update-object";
import { configPath, getConfigFile } from "./helpers";

import { DEFAULT_CONFIG_DATA } from ".";

(async () => {
  if (!fs.existsSync(configPath)) {
    fs.writeFile(
      configPath,
      JSON.stringify(DEFAULT_CONFIG_DATA, null, 2),
      "utf8",
      err => {
        if (err) throw err;
      }
    );

    console.log("[VitNode] - Config file has been generated");
  } else {
    console.log("[VitNode] - Config file already exists. Updating...");

    // Update config file
    const config = await getConfigFile();
    const updatedConfig = updateObject(
      {
        ...config,
        rebuild_required: {
          langs: false,
          plugins: false,
          themes: false
        }
      },
      DEFAULT_CONFIG_DATA
    );

    fs.writeFile(
      configPath,
      JSON.stringify(updatedConfig, null, 2),
      "utf8",
      err => {
        if (err) throw err;
      }
    );

    console.log("[VitNode] - Config file has been updated");
  }
})();
