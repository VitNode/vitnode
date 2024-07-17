#!/usr/bin/env node
/* eslint-disable no-console */

import { join } from 'path';
import * as fs from 'fs';
import { getAllFiles } from './helpers/get-all-files';

const init = () => {
  const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Frontend]\x1b[0m';
  // Copy frontend files from app dir
  const frontendPackagePath = join(__dirname, '..', '..', 'folders_to_copy');
  const frontendAppPath = process.cwd();
  const isLocaleFolder = fs.existsSync(
    join(frontendAppPath, 'app', '[locale]'),
  );
  const localePath = isLocaleFolder ? join('app', '[locale]') : 'app';
  const pathsToFolders = [
    join(localePath, 'admin', '(vitnode)'),
    join(localePath, 'admin', '(auth)', '(vitnode)'),
  ];
  const pathsToFoldersOptional = [join(localePath, '(main)', '(vitnode)')];
  const pathsToFiles = [
    {
      folder: join(localePath, '(main)', '(vitnode)', '[...rest]'),
      file: 'page.tsx',
    },
    {
      folder: 'app',
      file: 'not-found.tsx',
    },
    {
      folder: localePath,
      file: 'layout.tsx',
    },
    {
      folder: join(localePath, 'admin'),
      file: 'layout.tsx',
    },
    {
      folder: join(localePath, 'admin', '(auth)'),
      file: 'layout.tsx',
    },
    {
      folder: join(localePath, '(main)'),
      file: 'page.tsx',
    },
    {
      folder: join('plugins', 'core', 'langs'),
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
      fs.mkdirSync(packagePath, { recursive: true });
    }

    fs.cpSync(packagePath, appPath, { recursive: true });
  });

  // Copy folders if don't exist
  pathsToFoldersOptional.forEach(folder => {
    const appPath = join(frontendAppPath, folder);
    const packagePath = join(frontendPackagePath, folder);

    if (!fs.existsSync(packagePath)) {
      fs.mkdirSync(packagePath, { recursive: true });
    }

    const files = getAllFiles(packagePath);

    files.forEach(file => {
      const dir = file.dir.replace(packagePath, '');
      const appFilePath = dir ? join(appPath, dir) : join(appPath);
      const packageFilePath = dir
        ? join(frontendPackagePath, folder, dir, file.name)
        : join(frontendPackagePath, folder, file.name);

      if (!fs.existsSync(join(appFilePath, file.name))) {
        fs.mkdirSync(appFilePath, { recursive: true });
        fs.copyFileSync(packageFilePath, join(appFilePath, file.name));
      }
    });
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
