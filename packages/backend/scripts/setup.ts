import { createClientDatabase, DATABASE_ENVS } from '@/utils/database/client';
/* eslint-disable no-console */
import { existsSync } from 'fs';
import { join } from 'path';

import coreSchemaDatabase from '../src/database';
import { copyFiles } from './copy-files';
import { generateDatabaseMigrations, runMigrations } from './database';
import { generateConfig } from './generate-config';
import { generateManifest } from './generate-manifest';
import { updatePlugins } from './update-plugins';

const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Backend]\x1b[0m';

const getPluginsPath = () => {
  const pluginsPath = join(process.cwd(), 'src', 'plugins');
  if (!existsSync(pluginsPath)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${pluginsPath}"`,
    );
    process.exit(1);
  }

  return pluginsPath;
};

const init = async () => {
  let skipDatabase = false;
  if (process.argv[3] === '--skip-database') {
    const skipDatabaseMessage = `${initConsole} '--skip-database' flag detected. Skipping database setup...`;
    console.log(skipDatabaseMessage);
    skipDatabase = true;
  }

  const pluginsPath = getPluginsPath();
  console.log(
    `${initConsole} [1/${skipDatabase ? 2 : 6}] Setup the project. Generating the config file...`,
  );
  await generateConfig({ pluginsPath });

  console.log(
    `${initConsole} [2/${skipDatabase ? 2 : 6}] Copying files into backend...`,
  );
  await copyFiles({ pluginsPath });

  if (skipDatabase) {
    console.log(`${initConsole} ✅ Project setup complete.`);
    process.exit(0);
  }

  console.log(`${initConsole} [3/6] Generating database migrations...`);
  await generateDatabaseMigrations();

  console.log(`${initConsole} [4/6] Generating the manifest files...`);
  await generateManifest();

  const database = createClientDatabase({
    config: DATABASE_ENVS,
    schemaDatabase: coreSchemaDatabase,
  });

  console.log(
    `${initConsole} [5/6] Create tables in database using migrations...`,
  );
  await runMigrations();

  console.log(`${initConsole} [6/6] Updating plugins...`);
  await updatePlugins({ pluginsPath, db: database.db });

  console.log(`${initConsole} ✅ Project setup complete.`);
  process.exit(0);
};

if (process.argv[2] === 'init') {
  void init();
}
