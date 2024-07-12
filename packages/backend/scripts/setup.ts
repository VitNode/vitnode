#!/usr/bin/env node
/* eslint-disable no-console */

import * as fs from 'fs';
import { join } from 'path';

import { copyFiles } from './copy-files';
import { generateManifest } from './generate-manifest';
import { generateMigrations } from './generate-migrations';
import { updatePlugins } from './update-plugins';
import coreSchemaDatabase from '../src/plugins/core/admin/database';
import { generateDatabaseMigrations } from './generate-database-migrations';
import { generateConfig } from './generate-config';

import { createClientDatabase, DATABASE_ENVS } from '@/utils/database/client';

const init = async () => {
  let skipDatabase = false;
  if (process.argv[3] === '--skip-database') {
    console.log(
      '\x1b[34m%s\x1b[0m',
      '[VitNode]',
      '`--skip-database` flag detected. Skipping database setup...',
    );
    skipDatabase = true;
  }

  const pluginsPath = join(process.cwd(), 'src', 'plugins');
  if (!fs.existsSync(pluginsPath)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${pluginsPath}"`,
    );
    process.exit(1);
  }

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    `[1/${skipDatabase ? 2 : 6}] Setup the project. Generating the config file...`,
  );
  generateConfig({ pluginsPath });

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    `[2/${skipDatabase ? 2 : 6}] Copying files into backend...`,
  );
  copyFiles({ pluginsPath });

  if (skipDatabase) {
    console.log('\x1b[34m%s\x1b[0m', '[VitNode]', '✅ Project setup complete.');
    process.exit(0);
  }

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    '[3/6] Generating database migrations...',
  );
  await generateDatabaseMigrations({ pluginsPath });

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    '[4/6] Generating the manifest files...',
  );
  generateManifest();

  const database = createClientDatabase({
    config: DATABASE_ENVS,
    schemaDatabase: coreSchemaDatabase,
  });

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    '[5/6] Generating migrations...',
  );
  await generateMigrations({ pluginsPath, db: database.db });

  console.log('\x1b[34m%s\x1b[0m', '[VitNode]', '[6/6] Updating plugins...');
  await updatePlugins({ pluginsPath, db: database.db });

  await database.poolDB.end();
  console.log('\x1b[34m%s\x1b[0m', '[VitNode]', '✅ Project setup complete.');
  process.exit(0);
};

if (process.argv[2] === 'init') {
  init();
}
