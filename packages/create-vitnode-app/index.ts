#!/usr/bin/env node
// Ref: https://github.com/vercel/next.js/blob/canary/packages/create-next-app/index.ts
import { Command } from 'commander';
import colors from 'picocolors';
import figlet from 'figlet';
import packageJson from './package.json' assert { type: 'json' };
import prompts from 'prompts';
import { validateNpmName } from './helpers/validate-pkg';
import { basename, dirname, resolve } from 'path';
import { existsSync } from 'fs';
import { isFolderEmpty } from './helpers/is-folder-empty';
import { getPkgManager } from './helpers/get-pkg-manager';
import { isWriteable } from './helpers/is-writeable';

let projectPath: string = '';

const program = new Command(packageJson.name)
  .version(packageJson.version)
  .argument('[project-directory]')
  .usage(`${colors.green('[project-directory]')} [options]`)
  .action(name => {
    projectPath = name;
  })
  .option('--turbo', 'Enable Turbopack by default for development.')
  .option('--use-npm', 'Use NPM as the package manager.')
  .option('--use-yarn', 'Use Yarn as the package manager.')
  .option('--use-pnpm', 'Use PNPM as the package manager.')
  .option(
    '--skip-install',
    'Skip installing packages after initializing the project.',
  )
  .parse(process.argv)
  .opts();

const packageManager = !!program.useNpm
  ? 'npm'
  : !!program.usePnpm
    ? 'pnpm'
    : !!program.useYarn
      ? 'yarn'
      : !!program.useBun
        ? 'bun'
        : getPkgManager();

(async () => {
  console.log(
    colors.blue(
      figlet.textSync('VitNode', {
        horizontalLayout: 'full',
      }),
    ),
  );

  if (!projectPath) {
    const response = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: name => {
        const validation = validateNpmName({
          name: basename(resolve(name)),
        });
        if (validation.valid) return true;

        return `Invalid project name: ${validation.problems[0]}`;
      },
    });

    if (typeof response.path === 'string') {
      projectPath = response.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      '\nPlease specify the project directory:\n' +
        `  ${colors.cyan(program.name())} ${colors.green('<project-directory>')}\n` +
        'For example:\n' +
        `  ${colors.cyan(program.name())} ${colors.green('my-vitnode-app')}\n\n` +
        `Run ${colors.cyan(`${program.name()} --help`)} to see all options.`,
    );
    process.exit(1);
  }

  /**
   * Verify the project name is valid
   */
  const resolvedProjectPath = resolve(projectPath);
  const projectName = basename(resolvedProjectPath);
  const validation = validateNpmName({ name: projectName });
  if (!validation.valid) {
    console.error(
      `Could not create a project called ${colors.red(
        `"${projectName}"`,
      )} because of npm naming restrictions:`,
    );

    validation.problems.forEach(p =>
      console.error(`${colors.red(colors.bold('*'))} ${p}`),
    );
    process.exit(1);
  }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = resolve(resolvedProjectPath);
  const appName = basename(root);
  const folderExists = existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  /**
   * Verify the project dir is writeable
   */
  if (!(await isWriteable(dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.',
    );
    console.error(
      'It is likely you do not have write permissions for this folder.',
    );
    process.exit(1);
  }

  console.log(`Creating a new VitNode app in ${resolvedProjectPath}.\n`);
})();
