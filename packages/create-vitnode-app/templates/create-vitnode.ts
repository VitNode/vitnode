import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import color from 'picocolors';

import { isFolderEmpty } from '../helpers/is-folder-empty';
import { CreateCliReturn } from '../cli';

interface Args extends CreateCliReturn {
  appName: string;
  root: string;
}

export const createVitNode = ({
  root,
  appName,
  packageManager,
  eslint,
}: Args) => {
  const templatePath = join(__dirname, '..', 'templates');
  console.log(templatePath);
  console.log(
    `Creating a new VitNode app in ${color.green(root)}. Using ${color.green(packageManager)}... \n`,
  );

  /**
   * Create the folder
   */
  mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  process.chdir(root);
  const packageJsonPath = join(root, 'package.json');

  // Copy the basic template
  cpSync(join(templatePath, 'basic'), root, { recursive: true });

  // Change tailwind.config.ts based on package manager
  if (packageManager === 'pnpm') {
    const tailwindConfigPath = join(root, 'frontend', 'tailwind.config.ts');
    const tailwindConfig = readFileSync(tailwindConfigPath, 'utf-8');
    const newTailwindConfig = tailwindConfig
      .replace(
        '../../node_modules/vitnode-frontend/src/components/**/*.tsx',
        './node_modules/vitnode-frontend/src/components/**/*.tsx',
      )
      .replace(
        '../../node_modules/vitnode-frontend/src/views/**/*.tsx',
        './node_modules/vitnode-frontend/src/views/**/*.tsx',
      );

    writeFileSync(tailwindConfigPath, newTailwindConfig);
  }

  if (eslint) {
    cpSync(join(templatePath, 'eslint'), root, { recursive: true });
  }
};
