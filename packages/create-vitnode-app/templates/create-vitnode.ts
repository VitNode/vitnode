import { cpSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';

import figlet from 'figlet';
import ora from 'ora';
import color from 'picocolors';

import { isFolderEmpty } from '../helpers/is-folder-empty';
import { CreateCliReturn } from '../cli';
import { createPackagesJSON } from './create-packages-json';
import { installDependencies } from './install-dependencies';
import { tryGitInit } from '../helpers/git';

interface Args extends CreateCliReturn {
  appName: string;
  root: string;
}

export const createVitNode = async ({
  root,
  appName,
  packageManager,
  eslint,
  docker,
  install,
}: Args) => {
  const useNpm = packageManager.startsWith('npm');
  const pm = packageManager.split('@')[0];
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

  // Install dependencies
  if (install) {
    spinner.text = 'Installing dependencies...';
    await installDependencies({ packageManager });
  }

  spinner.text = 'Initializing a git repository...';
  tryGitInit(root);

  console.log(
    '\n' +
      color.blue(
        figlet.textSync('VitNode', {
          horizontalLayout: 'full',
        }),
      ),
    +'\n',
  );

  spinner.succeed(
    ` ${color.green('Success!')} Created ${color.cyan(appName)} at ${color.cyan(root)}`,
  );

  console.log('Inside that directory, you can run several commands:\n');
  console.log(color.cyan(`  ${pm} ${useNpm ? 'run ' : ''}dev`));
  console.log('    Starts the development servers.\n');
  console.log(color.cyan(`  ${pm} ${useNpm ? 'run ' : ''}config:init`));
  console.log('    Initializes the VitNode config & files to build project.\n');
  console.log(color.cyan(`  ${pm} ${useNpm ? 'run ' : ''}build`));
  console.log('    Builds the apps for production.\n');
  console.log(color.cyan(`  ${pm} start`));
  console.log('    Runs the built app in production mode.\n');
  console.log('We suggest that you begin by typing:\n');
  console.log(color.cyan('  cd'), appName);
  console.log(`  ${color.cyan(`${pm} ${useNpm ? 'run ' : ''}dev`)}\n`);
  console.log(color.magenta('Happy hacking!'));
};
