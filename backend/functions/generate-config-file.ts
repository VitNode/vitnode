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
  applications: ['core', 'admin'],
  finished_install: false
};

export const generateConfigFile = (): void => {
  const configPath = join('..', 'frontend', 'config.json');
  const config = fs.existsSync(configPath);
  if (config) return;

  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), 'utf8', err => {
    if (err) throw err;
  });

  // eslint-disable-next-line no-console
  console.log('[First Install VitNode] - Config file has been generated');
};
