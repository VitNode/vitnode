/* eslint-disable no-console */
import * as fs from "fs";

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
      site_name: "VitNode Community"
    }
  }
};

function updateConfig<T>(config: T, defaultData: ConfigType): T {
  for (const key in defaultData) {
    if (typeof defaultData[key] === "object" && defaultData[key] !== null) {
      if (!config[key]) {
        config[key] = {};
      }
      updateConfig(config[key], defaultData[key]);
    } else {
      if (!config[key]) {
        config[key] = defaultData[key];
      }
    }
  }

  return config;
}

(async () => {
  if (!fs.existsSync(configPath)) {
    fs.writeFile(configPath, JSON.stringify(DATA, null, 2), "utf8", err => {
      if (err) throw err;
    });

    console.log("[VitNode] - Config file has been generated");
  } else {
    console.log("[VitNode] - Config file already exists. Updating...");

    // Update config file
    const config = await getConfigFile();
    const updatedConfig = updateConfig(config, DATA);

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
