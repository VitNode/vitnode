import { promises } from 'fs';
import { join } from 'path';

export interface ConfigType {
  applications: string[];
  finished_install: boolean;
  languages: {
    default: string;
    locales: {
      enabled: boolean;
      key: string;
    }[];
  };
  side_name: string;
}

export const getConfig = async () => {
  const configPath = join('config', 'config.json');
  const file = await promises.readFile(configPath, 'utf8');

  return JSON.parse(file) as ConfigType;
};
