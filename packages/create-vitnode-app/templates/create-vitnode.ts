import { cpSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';

import ora from 'ora';
import color from 'picocolors';

import { isFolderEmpty } from '../helpers/is-folder-empty';
import { CreateCliReturn } from '../cli';
import { createPackagesJSON } from './create-packages-json';
import { installDependencies } from './install-dependencies';

interface Args extends CreateCliReturn {
  appName: string;
  root: string;
}

export const createVitNode = async ({
  root,
  appName,
  packageManager,
  eslint,
  i18nRouting,
  docker,
  install,
}: Args) => {
  const templatePath = join(__dirname, '..', 'templates');
  const spinner = ora(
    `Creating a new VitNode app in ${color.green(root)}. Using ${color.green(packageManager)}...`,
  ).start();

  /**
   * Create the folder
   */
  mkdirSync(root, { recursive: true });
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  process.chdir(root);

  // Copy the basic template
  spinner.text = 'Copying files...';
  cpSync(join(templatePath, 'basic'), root, { recursive: true });

  // Create package.json
  spinner.text = 'Creating package.json...';
  createPackagesJSON({
    appName,
    root,
    packageManager,
    docker,
    eslint,
  });

  // Rename files
  spinner.text = 'Renaming files...';
  renameSync(join(root, '.gitignore_template'), join(root, '.gitignore'));
  renameSync(join(root, '.npmrc_template'), join(root, '.npmrc'));

  // Change tailwind.config.ts based on package manager
  spinner.text = 'Changing tailwind.config.ts...';
  if (packageManager.startsWith('pnpm')) {
    const tailwindConfigPath = join(
      root,
      'apps',
      'frontend',
      'tailwind.config.ts',
    );
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
    spinner.text = 'Copying pnpm template...';
    cpSync(join(templatePath, 'pnpm'), root, { recursive: true });
  }

  // Copy eslint template
  if (eslint) {
    spinner.text = 'Copying eslint template...';
    cpSync(join(templatePath, 'eslint'), root, { recursive: true });
  }

  // Copy docker template
  if (docker) {
    spinner.text = 'Copying docker template...';
    cpSync(join(templatePath, 'docker'), root, { recursive: true });
  }

  // Copy i18n template
  spinner.text = 'Copying i18n template...';
  cpSync(
    i18nRouting
      ? join(templatePath, 'i18n', 'with')
      : join(templatePath, 'i18n', 'without'),
    root,
    { recursive: true },
  );

  // Install dependencies
  if (install) {
    spinner.text = 'Installing dependencies...';
    await installDependencies({ packageManager });
  }

  spinner.succeed(color.green('Done!'));
};
