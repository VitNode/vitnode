import { mkdirSync } from 'fs';
import { join } from 'path';

import colors from 'picocolors';

import { isFolderEmpty } from './helpers/is-folder-empty';
import { CreateCliReturn } from './cli';

interface Args extends CreateCliReturn {
  appName: string;
  root: string;
}

export const createVitNode = ({ root, appName }: Args) => {
  console.log(`Creating a new VitNode app in ${colors.green(root)}.\n`);

  /**
   * Create the folder
   */
  mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  process.chdir(root);
  const packageJsonPath = join(root, 'package.json');
};
