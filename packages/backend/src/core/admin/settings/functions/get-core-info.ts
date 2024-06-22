import { join } from "path";
import * as fs from "fs";

import { PluginInfoJSONType } from "../../plugins/type";

export const getCoreInfo = async () => {
  const path = join(process.cwd(), "src", "plugins", "core");
  const config = fs.readFileSync(join(path, "config.json"), "utf8");
  const data: PluginInfoJSONType = JSON.parse(config);

  const pathVersionsJSON = join(path, "versions.json");
  const versionsFile = await fs.promises.readFile(pathVersionsJSON, "utf8");
  const versions: Record<string, string> = JSON.parse(versionsFile);

  // Find the latest version
  const latestVersion = Object.keys(versions).sort().reverse()[0];
  const version = versions[latestVersion];

  return {
    ...data,
    version
  };
};
