import { cpSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';

import color from 'picocolors';

import { isFolderEmpty } from '../helpers/is-folder-empty';
import { CreateCliReturn } from '../cli';
import { createPackagesJSON } from './create-packages-json';

interface Args extends CreateCliReturn {
  appName: string;
  root: string;
}

export const createVitNode = async ({
  root,
  appName,
  packageManager,
  eslint,
}: Args) => {
  const templatePath = join(__dirname, '..', 'templates');
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

  // Copy the basic template
  cpSync(join(templatePath, 'basic'), root, { recursive: true });

  // Create package.json
  createPackagesJSON({
    appName,
    root,
    packageManager,
  });

  // Rename files
  renameSync(join(root, '.gitignore_template'), join(root, '.gitignore'));
  renameSync(join(root, '.npmrc_template'), join(root, '.npmrc'));

  // Change tailwind.config.ts based on package manager
  if (packageManager.startsWith('pnpm')) {
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

  // Copy pnpm template
  if (packageManager.startsWith('pnpm')) {
    cpSync(join(templatePath, 'pnpm'), root, { recursive: true });
  }

  // Copy eslint template
  if (eslint) {
    cpSync(join(templatePath, 'eslint'), root, { recursive: true });
  }
};
