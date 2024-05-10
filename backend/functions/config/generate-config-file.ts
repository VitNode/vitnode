/* eslint-disable no-console */
import * as fs from "fs";

import { generateManifest } from "./manifest";
import { updateObject } from "./update-object";
import { DEFAULT_CONFIG_DATA } from "./default-config-data";
import { configPath, getConfigFile } from "@/config";

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

    await generateManifest(DEFAULT_CONFIG_DATA);

    console.log("[VitNode] - Config file has been generated");
  } else {
    console.log("[VitNode] - Config file already exists. Updating...");

    // Update config file
    const config = await getConfigFile();
    const updatedConfig = updateObject(config, DEFAULT_CONFIG_DATA);

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
