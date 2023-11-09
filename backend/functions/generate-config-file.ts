import * as fs from 'fs';
import { join } from 'path';

const DATA = {
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
  agree_terms: false
};

export const generateConfigFile = (): void => {
  const configPath = join('..', 'config.json');
  const config = fs.existsSync(configPath);
  if (config) return;

  fs.writeFile(configPath, JSON.stringify(DATA, null, 2), 'utf8', err => {
    if (err) throw err;
  });
};
