#!/usr/bin/env node
/* eslint-disable no-console */

import * as fs from 'fs';
import { join } from 'path';

const init = ({ dev }: { dev: boolean }) => {
  const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Frontend]\x1b[0m';

  // Delete cache folder
  const cachePath = join(process.cwd(), '.next', 'cache');
  if (fs.existsSync(cachePath)) {
    console.log(`${initConsole} Deleting cache folder...`);
    fs.rmSync(cachePath, { recursive: true });
  }

  if (dev) {
    console.log(`${initConsole} ✅ Development environment is ready.`);
    process.exit(0);
  }

  // Copy frontend files from app dir
  const frontendPackagePath = join(__dirname, '..', '..', 'folders_to_copy');
  const frontendAppPath = process.cwd();
  const pathsToFolders = [
    join('src', 'app', '[locale]', 'admin', '(vitnode)'),
    join('src', 'app', '[locale]', 'admin', '(auth)', '(vitnode)'),
    join('src', 'app', '[locale]', '(main)', '(layout)', '(vitnode)'),
  ];
  const pathsToFile: {
    file: string;
    path: string;
  }[] = [
    {
      path: join('src', 'app'),
      file: 'not-found.tsx',
    },
    {
      path: join('src', 'app'),
      file: 'layout.tsx',
    },
    {
      path: join('src', 'plugins', 'core', 'langs'),
      file: 'en.json',
    },
    {
      path: join('src', 'plugins', 'admin', 'langs'),
      file: 'en.json',
    },
  ];

  if (!fs.existsSync(frontendPackagePath)) {
    console.log(
      `${initConsole} ⛔️ The frontend package does not have any files to copy. Please report this issue to the VitNode GitHub.`,
    );
    process.exit(1);
  }

  // Copy folders
  pathsToFolders.forEach(folder => {
    const appPath = join(frontendAppPath, folder);
    const packagePath = join(frontendPackagePath, folder);

    if (!fs.existsSync(packagePath)) {
      console.error(
        `${initConsole} ⛔️ "${packagePath}" folder does not exist in the frontend package. Please report this issue to the VitNode GitHub.`,
      );
      process.exit(1);
    }

    fs.cpSync(packagePath, appPath, { recursive: true });
  });

  // Copy files
  pathsToFile.forEach(file => {
    const appPath = join(frontendAppPath, file.path);
    const packagePath = join(frontendPackagePath, file.path);

    if (!fs.existsSync(packagePath)) {
      console.error(
        `${initConsole} ⛔️ "${packagePath}" file does not exist in the frontend package. Please report this issue to the VitNode GitHub.`,
      );
      process.exit(1);
    }

    if (!fs.existsSync(appPath)) {
      fs.mkdirSync(appPath, { recursive: true });
    }

    fs.copyFileSync(join(packagePath, file.file), join(appPath, file.file));
  });

  console.log(`${initConsole} ✅ Frontend files copied successfully.`);
  process.exit(0);
};

if (process.argv[2] === 'init') {
  init({ dev: false });
} else if (process.argv[2] === 'dev') {
  init({ dev: true });
}
