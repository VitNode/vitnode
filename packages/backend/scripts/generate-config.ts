import * as fs from 'fs';
import { join } from 'path';

import { DEFAULT_CONFIG_DATA, getConfigFile } from '../src/providers/config';
import { updateObject } from './helpers/update-object';

export const generateConfig = ({ pluginsPath }: { pluginsPath: string }) => {
  const folderPath = join(pluginsPath, 'core', 'utils');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  const configPath = join(folderPath, 'config.json');
  if (!fs.existsSync(configPath)) {
    fs.writeFileSync(
      configPath,
      JSON.stringify(DEFAULT_CONFIG_DATA, null, 2),
      'utf8',
    );

    return;
  }

  const config = getConfigFile();
  const updatedConfig = updateObject(config, DEFAULT_CONFIG_DATA);

  fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf8');
};
