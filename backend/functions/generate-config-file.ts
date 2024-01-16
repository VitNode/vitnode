/* eslint-disable no-console */
import * as fs from 'fs';
import { join } from 'path';

import { ConfigType } from '@/types/config.type';

const DATA: ConfigType = {
  side_name: 'VitNode Community',
  languages: {
    locales: [
      {
        key: 'en',
        enabled: true
      },
      {
        key: 'pl',
        enabled: true
      }
    ],
    default: 'en'
  },
  applications: ['core', 'admin', 'forum'],
  finished_install: false
};

export const configPath = join('..', 'frontend', 'config.json');
if (!fs.existsSync(configPath)) {
  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), 'utf8', err => {
    if (err) throw err;
  });

  console.log('[First Install VitNode] - Config file has been generated');
} else {
  console.log('[First Install VitNode] - Config file already exists');
}
