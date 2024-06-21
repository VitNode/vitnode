import { join } from "path";
import * as fs from "fs";

import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { ConfigPlugin } from "vitnode-backend";

import { core_plugins } from "@/plugins/core/admin/database/schema/plugins";
import { schemaDatabase } from "@/database/schema";
import { poolDB } from "@/database/client";
import { ABSOLUTE_PATHS } from "@/config";

export const updatePlugins = async ({
  db
}: {
  db: NodePgDatabase<typeof schemaDatabase>;
}) => {
  fs.readdir(join(process.cwd(), "src", "plugins"), async (err, plugins) => {
    let isDefaultIndex: number | null = null;
    const defaultPlugin = await db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.default, true)
    });

    await Promise.all(
      plugins
        .filter(
          plugin => !["database", "plugins.module.ts", "core"].includes(plugin)
        )
        .map(async (code, index) => {
          const paths = ABSOLUTE_PATHS.plugin({ code });
          const config: ConfigPlugin = JSON.parse(
            fs.readFileSync(paths.config, "utf8")
          );

          if (config.allow_default) {
            isDefaultIndex = index;
          }
          const versions: Record<string, string> = JSON.parse(
            fs.readFileSync(paths.versions, "utf8")
          );
          const latestVersion = Object.keys(versions).sort().reverse()[0];
          const version = versions[latestVersion];

          let pluginId: number | null = null;
          const plugin = await db.query.core_plugins.findFirst({
            where: (table, { eq }) => eq(table.code, code)
          });

          if (plugin) {
            pluginId = plugin.id;

            await db
              .update(core_plugins)
              .set({
                name: config.name,
                description: config.description,
                support_url: config.support_url,
                author: config.author,
                author_url: config.author_url,
                allow_default: config.allow_default,
                version,
                version_code: +latestVersion
              })
              .where(eq(core_plugins.id, pluginId));
          } else {
            const pluginInsert = await db
              .insert(core_plugins)
              .values([
                {
                  name: config.name,
                  description: config.description,
                  code: config.code,
                  support_url: config.support_url,
                  author: config.author,
                  author_url: config.author_url,
                  allow_default: config.allow_default,
                  version: version ?? null,
                  version_code: latestVersion ? +latestVersion : null,
                  default: isDefaultIndex === index && !defaultPlugin
                }
              ])
              .returning();

            pluginId = pluginInsert[0].id;
          }
        })
    );

    await poolDB.end();
  });
};
