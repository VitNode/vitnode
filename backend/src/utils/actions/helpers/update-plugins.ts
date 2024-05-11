import { join } from "path";
import * as fs from "fs";

import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import { ConfigPlugin } from "@/plugins/core/admin/plugins/plugins.module";
import {
  core_plugins,
  core_plugins_nav
} from "@/plugins/core/admin/database/schema/plugins";
import { schemaDatabase } from "@/database/schema";
import { poolDB } from "@/database/client";

export const updateNavAdminPlugin = async ({
  config,
  db,
  id
}: {
  config: Pick<ConfigPlugin, "nav">;
  db: NodePgDatabase<typeof schemaDatabase>;
  id: number;
}) => {
  const navFromDatabase = await db.query.core_plugins_nav.findMany({
    where: (table, { eq }) => eq(table.plugin_id, id)
  });

  const update = await Promise.all(
    config.nav.map(async item => {
      const itemExist = navFromDatabase.find(el => el.code === item.code);

      if (itemExist) {
        const update = await db
          .update(core_plugins_nav)
          .set({ ...item, plugin_id: id })
          .where(eq(core_plugins_nav.id, itemExist.id))
          .returning();

        return update[0];
      }

      const lastPosition = await db.query.core_plugins_nav.findFirst({
        orderBy: (table, { desc }) => desc(table.position)
      });

      const insert = await db
        .insert(core_plugins_nav)
        .values({
          ...item,
          plugin_id: id,
          position: lastPosition?.position ? lastPosition.position + 1 : 0
        })
        .returning();

      return insert[0];
    })
  );

  Promise.all(
    navFromDatabase.map(async item => {
      const exist = update.find(el => el.id === item.id);
      if (exist) return;

      await db.delete(core_plugins_nav).where(eq(core_plugins_nav.id, item.id));
    })
  );
};

export const updatePlugins = async ({
  db
}: {
  db: NodePgDatabase<typeof schemaDatabase>;
}) => {
  fs.readdir(join(process.cwd(), "src", "plugins"), async (err, plugins) => {
    let isDefaultIndex: number | null = null;
    await Promise.all(
      plugins
        .filter(
          plugin => !["database", "plugins.module.ts", "core"].includes(plugin)
        )
        .map(async (pluginName, index) => {
          const configPath = join(
            process.cwd(),
            "src",
            "plugins",
            pluginName,
            "plugin.json"
          );
          const config: ConfigPlugin = JSON.parse(
            fs.readFileSync(configPath, "utf8")
          );

          if (config.allow_default) {
            isDefaultIndex = index;
          }
          const versionsPath = join(
            process.cwd(),
            "src",
            "plugins",
            pluginName,
            "versions.json"
          );
          const versions: { [key: string]: string } = JSON.parse(
            fs.readFileSync(versionsPath, "utf8")
          );
          const latestVersion = Object.keys(versions).sort().reverse()[0];
          const version = versions[latestVersion];

          let pluginId: number | null = null;
          const plugin = await db.query.core_plugins.findFirst({
            where: (table, { eq }) => eq(table.code, pluginName)
          });

          if (plugin) {
            pluginId = plugin.id;

            await db
              .update(core_plugins)
              .set({
                updated: new Date(),
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
            const plugin = await db
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
                  default: isDefaultIndex === index
                }
              ])
              .returning();

            pluginId = plugin[0].id;
          }

          await updateNavAdminPlugin({
            db,
            config,
            id: pluginId
          });
        })
    );

    await poolDB.end();
  });
};
