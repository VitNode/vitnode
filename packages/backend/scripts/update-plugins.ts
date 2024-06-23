/* eslint-disable no-console */
import * as fs from "fs";
import { join } from "path";

import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

import { ConfigPlugin } from "../src";
import coreSchemaDatabase from "../src/templates/core/admin/database";
import { core_plugins } from "../src/templates/core/admin/database/schema/plugins";

export const updatePlugins = async ({
  pluginsPath,
  db,
}: {
  db: NodePgDatabase<typeof coreSchemaDatabase>;
  pluginsPath: string;
}) => {
  let isDefaultIndex: number | null = null;
  const defaultPlugin = await db.query.core_plugins.findFirst({
    where: (table, { eq }) => eq(table.default, true),
  });
  const plugins = fs
    .readdirSync(pluginsPath)
    .filter(plugin => !["core", "plugins.module.ts"].includes(plugin));

  await db.transaction(async tx => {
    await Promise.all(
      plugins.map(async (code, index) => {
        const pluginPath = join(pluginsPath, code);
        const config: ConfigPlugin = JSON.parse(
          fs.readFileSync(join(pluginPath, "config.json"), "utf8"),
        );

        if (config.allow_default) {
          isDefaultIndex = index;
        }
        const versions: Record<string, string> = JSON.parse(
          fs.readFileSync(join(pluginPath, "versions.json"), "utf8"),
        );
        const latestVersion = Object.keys(versions).sort().reverse()[0];
        const version = versions[latestVersion];

        const plugin = await tx.query.core_plugins.findFirst({
          where: (table, { eq }) => eq(table.code, code),
        });

        if (plugin) {
          await tx
            .update(core_plugins)
            .set({
              name: config.name,
              description: config.description,
              support_url: config.support_url,
              author: config.author,
              author_url: config.author_url,
              allow_default: config.allow_default,
              version,
              version_code: +latestVersion,
            })
            .where(eq(core_plugins.id, plugin.id));

          return;
        }
        await tx.insert(core_plugins).values([
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
            default: isDefaultIndex === index && !defaultPlugin,
          },
        ]);
      }),
    );
  });
};
