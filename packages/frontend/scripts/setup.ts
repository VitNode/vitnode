#!/usr/bin/env node
/* eslint-disable no-console */

import { join } from 'path';
import * as fs from 'fs';

const init = async () => {
  const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Frontend]\x1b[0m';
  // Copy frontend files from app dir
  const frontendPackagePath = join(__dirname, '..', '..', 'app');
  const frontendAppPath = join(process.cwd(), 'app', `[locale]`);
  const pathsToFolders = [
    join('admin', '(vitnode)'),
    join('admin', '(auth)', '(vitnode)'),
    join('(main)', '(vitnode)'),
  ];
  const pathsToFiles = [
    {
      folder: 'admin',
      file: 'layout.tsx',
    },
    {
      folder: '(main)',
      file: 'page.tsx',
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
      fs.mkdirSync(packagePath, { recursive: true });
    }

    fs.cpSync(packagePath, appPath, { recursive: true });
  });

  pathsToFiles.forEach(file => {
    const appPath = join(frontendAppPath, file.folder, file.file);
    const packagePath = join(frontendPackagePath, file.folder, file.file);

    fs.cpSync(packagePath, appPath, {
      recursive: true,
    });
  });

  console.log(`${initConsole} ✅ Frontend files copied successfully.`);
  process.exit(0);
};

if (process.argv[2] === 'init') {
  init();
}
