/* eslint-disable no-console */
import * as fs from 'fs';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import coreSchemaDatabase from '../src/plugins/core/admin/database';
import { migrate } from './helpers/migrate';

export const generateMigrations = async ({
  pluginsPath,
  db,
}: {
  db: NodePgDatabase<typeof coreSchemaDatabase>;
  pluginsPath: string;
}) => {
  await migrate({ pluginCode: 'core', db });

  await Promise.all(
    fs
      .readdirSync(pluginsPath)
      .filter(plugin => !['core', 'plugins.module.ts'].includes(plugin))
      .map(async plugin => {
        try {
          await migrate({ pluginCode: plugin, db });
        } catch (error) {
          const err = error as Error;
          console.error(`⛔️ Error migrating plugin ${plugin}: ${err.message}`);
          process.exit(1);
        }
      }),
  );
};
