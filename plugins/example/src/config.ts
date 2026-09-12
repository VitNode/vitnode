import { definePluginFactory } from "@vitnode/core/config";

import { CONFIG_PLUGIN } from "@/const";

export const examplePlugin = definePluginFactory({
  pluginId: CONFIG_PLUGIN.pluginId,
});
