#!/usr/bin/env node
import * as fs from 'fs';
import { join } from 'path';

import {
  DEFAULT_CONFIG_DATA,
  configPath,
  getConfigFile,
} from '../src/helpers/config';
import { updateObject } from './helpers/update-object';

/* eslint-disable no-console */

const generateConfigFile = async () => {
  const pathToFolder = join(process.cwd(), 'config');
  if (!fs.existsSync(pathToFolder)) {
    fs.mkdirSync(pathToFolder, { recursive: true });
  }

  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify(
        {
          ...DEFAULT_CONFIG_DATA,
          lang: [
            { code: 'en', enabled: true },
            { code: 'pl', enabled: true },
          ],
        },
        null,
        2,
      ),
      'utf8',
    );

    console.log(
      '\x1b[34m%s\x1b[0m',
      '[VitNode]',
      'Config file created successfully.',
    );
    process.exit(0);
  }

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    'Config file already exists. Updating...',
  );

  const config = await getConfigFile();
  const updatedConfig = updateObject(
    {
      ...config,
      rebuild_required: {
        langs: false,
        plugins: false,
      },
    },
    DEFAULT_CONFIG_DATA,
  );

  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8');

  console.log(
    '\x1b[34m%s\x1b[0m',
    '[VitNode]',
    'Config file updated successfully.',
  );
};

if (process.argv[2] === 'init') {
  generateConfigFile();
}
