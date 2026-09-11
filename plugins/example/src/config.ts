import { definePluginFactory } from "@vitnode/core/config";

import { CONFIG_PLUGIN } from "@/const";

export const examplePlugin = definePluginFactory({
  pluginId: CONFIG_PLUGIN.pluginId,
  entries: {
    adminContent: `${CONFIG_PLUGIN.pluginId}/admin/content`,
    adminNav: `${CONFIG_PLUGIN.pluginId}/admin/nav`,
    api: `${CONFIG_PLUGIN.pluginId}/config.api`,
    routes: `${CONFIG_PLUGIN.pluginId}/routes`,
  },
});
