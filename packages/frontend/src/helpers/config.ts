import { join } from 'path';
import * as fs from 'fs';

import { ConfigType } from 'vitnode-shared';

export const DEFAULT_CONFIG_DATA: ConfigType = {
  rebuild_required: {
    langs: false,
    plugins: false,
  },
  editor: {
    sticky: true,
    files: {
      allow_type: 'all',
    },
  },
  settings: {
    general: {
      site_name: 'VitNode Community',
      site_short_name: 'VitNode',
    },
    email: {
      color_primary: 'hsl(220, 74%, 50%)',
      color_primary_foreground: 'hsl(210, 40%, 98%)',
    },
  },
  langs: [
    {
      code: 'en',
      enabled: true,
      default: true,
    },
    {
      code: 'pl',
      enabled: true,
      default: false,
    },
  ],
};

export const configPath = join(process.cwd(), 'config', 'config.json');

export const getConfigFile = async () => {
  const file = await fs.promises.readFile(configPath, 'utf8');

  return JSON.parse(file) as ConfigType;
};
