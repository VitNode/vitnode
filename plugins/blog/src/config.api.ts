import { defineApiPluginFactory } from "@vitnode/core/api/lib/plugin";
import { buildContentPublicModule } from "@vitnode/core/content/server";

import { adminModule } from "@/api/modules/admin/admin.module";
import { CONFIG_PLUGIN } from "@/const";
import { categoryContent } from "@/database/categories";
import { postContent } from "@/database/posts";

import type { BlogPluginOptions } from "./config";

export const apiPlugin = defineApiPluginFactory<BlogPluginOptions>(options => ({
  pluginId: CONFIG_PLUGIN.pluginId,
  modules: [
    adminModule,
    ...(options.publicApi
      ? [
          buildContentPublicModule({
            pluginId: CONFIG_PLUGIN.pluginId,
            contentTypes: [categoryContent, postContent],
          }),
        ]
      : []),
  ],
}));
