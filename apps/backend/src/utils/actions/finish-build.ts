/* eslint-disable no-console */

import * as fs from "fs";
import { join } from "path";

import { updatePlugins } from "./helpers/update-plugins";
import { generateManifest } from "./helpers/manifest";
import { migrate } from "./migrate";

import { db } from "@/database/client";

(async () => {
  generateManifest();

  // Migration for database
  await migrate({ pluginCode: "core" });

  fs.readdir(join(process.cwd(), "src", "plugins"), async (err, plugins) => {
    await Promise.all(
      plugins
        .filter(plugin => !["plugins.module.ts", "core"].includes(plugin))
        .map(async plugin => {
          try {
            await migrate({ pluginCode: plugin });
          } catch (error) {
            console.error(`[VitNode] - Error running migration for ${plugin}`);
            console.error(error);

            throw error;
          }
        }),
    );
  });

  // Update plugins
  await updatePlugins({ db });

  console.log("[VitNode] - Successfully finished build");
})();
