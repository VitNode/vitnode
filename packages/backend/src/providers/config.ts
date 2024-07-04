import * as fs from 'fs';
import { join } from 'path';

export interface ConfigType {
  editor: {
    files: {
      allow_type: 'all' | 'images_videos' | 'images' | 'none';
    };
    sticky: boolean;
  };
  langs: {
    code: string;
    default: boolean;
    enabled: boolean;
  }[];
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
  };
  settings: {
    email: {
      color_primary: string;
      color_primary_foreground: string;
    };
    general: {
      site_name: string;
      site_short_name: string;
    };
  };
}

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

export const configPath = join(
  process.cwd(),
  'src',
  'plugins',
  'core',
  'utils',
  'config.json',
);

export const getConfigFile = () => {
  const file = fs.readFileSync(configPath, 'utf-8');

  return JSON.parse(file) as ConfigType;
};
