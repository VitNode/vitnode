import { Command } from 'commander';
import color from 'picocolors';
import prompts, { InitialReturnValue } from 'prompts';

import {
  getAvailablePackageManagers,
  PackageManager,
} from './helpers/get-available-package-managers';

export const onPromptState = (state: {
  aborted: boolean;
  exited: boolean;
  value: InitialReturnValue;
}) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write('\x1B[?25h');
    process.stdout.write('\n');
    process.exit(1);
  }
};

export interface CreateCliReturn {
  eslint: boolean;
  i18nRouting: boolean;
  install: boolean;
  packageManager: string;
}

export const createCli = async (program: Command): Promise<CreateCliReturn> => {
  const optionsFromProgram = program.opts();
  let options: CreateCliReturn = {
    packageManager: optionsFromProgram.packageManager,
    eslint: optionsFromProgram.eslint,
    i18nRouting: optionsFromProgram.i18nRouting,
    install: !optionsFromProgram.skipInstall,
  };

  if (!optionsFromProgram.packageManager) {
    const availablePackageManagers = await getAvailablePackageManagers();
    const text = color.blue('package manager');
    const { packageManager } = await prompts<string>({
      onState: onPromptState,
      name: 'packageManager',
      type: 'select',
      message: `Which ${text} do you want to use?`,
      initial: optionsFromProgram.packageManager,
      choices: [
        {
          title: `npm${availablePackageManagers.npm ? `@${availablePackageManagers.npm}` : ''}`,
          value: 'npm',
          disabled: !availablePackageManagers.npm,
        },
        {
          title: `pnpm${availablePackageManagers.pnpm ? `@${availablePackageManagers.pnpm}` : ''}`,
          value: 'pnpm',
          disabled: !availablePackageManagers.pnpm,
        },
        {
          title: `yarn${availablePackageManagers.yarn ? `@${availablePackageManagers.yarn}` : ''}`,
          value: 'yarn',
          disabled: !availablePackageManagers.yarn,
        },
      ],
    });

    options = {
      ...options,
      packageManager: `${packageManager}@${availablePackageManagers[packageManager as PackageManager]}`,
    };
  }

  if (optionsFromProgram.eslint === undefined) {
    const text = color.blue('ESLint');
    const { eslint } = await prompts({
      onState: onPromptState,
      type: 'toggle',
      name: 'eslint',
      message: `Would you like to use ${text}?`,
      initial: optionsFromProgram.eslint ? 'Yes' : 'No',
      active: 'Yes',
      inactive: 'No',
    });

    options = {
      ...options,
      eslint: Boolean(eslint),
    };
  }

  if (optionsFromProgram.i18nRouting === undefined) {
    const text = color.blue('i18n routing');
    const { i18nRouting } = await prompts({
      onState: onPromptState,
      type: 'toggle',
      name: 'i18nRouting',
      message: `Would you like to use ${text}?`,
      initial: optionsFromProgram.i18nRouting ? 'Yes' : 'No',
      active: 'Yes',
      inactive: 'No',
    });

    options = {
      ...options,
      i18nRouting: Boolean(i18nRouting),
    };
  }

  if (optionsFromProgram.skipInstall === undefined) {
    const text = color.blue('Install dependencies');
    const { install } = await prompts({
      onState: onPromptState,
      type: 'toggle',
      name: 'install',
      message: `Would you like to ${text}?`,
      initial: optionsFromProgram.eslint ? 'Yes' : 'No',
      active: 'Yes',
      inactive: 'No',
    });

    options = {
      ...options,
      install: Boolean(install),
    };
  }

  console.log('program', options);

  return options;
};
