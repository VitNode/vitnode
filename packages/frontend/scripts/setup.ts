#!/usr/bin/env node
/* eslint-disable no-console */

import path, { join } from 'path';
import * as fs from 'fs';
import { getAllFiles } from './helpers/get-all-files';

interface Folders {
  path: string;
  isInsideAppDir?: boolean;
}

const init = () => {
  const initConsole = '\x1b[34m[VitNode]\x1b[0m \x1b[33m[Frontend]\x1b[0m';
  // Copy frontend files from app dir
  const frontendPackagePath = join(__dirname, '..', '..', 'folders_to_copy');
  const frontendAppPath = process.cwd();
  const isLocaleFolder = fs.existsSync(
    join(frontendAppPath, 'app', '[locale]'),
  );
  const localePath = isLocaleFolder ? join('app', '[locale]') : 'app';

  const pathsToFolders: Folders[] = [
    {
      path: join('admin', '(vitnode)'),
      isInsideAppDir: true,
    },
    {
      path: join('admin', '(auth)', '(vitnode)'),
      isInsideAppDir: true,
    },
  ];
  const pathsToFoldersOptional: Folders[] = [
    {
      path: join('(main)', '(vitnode)'),
      isInsideAppDir: true,
    },
  ];
  const pathsToFile: {
    path: string;
    file: string;
    isInsideAppDir?: boolean;
  }[] = [
    {
      path: join('(main)', '(vitnode)', '[...rest]'),
      isInsideAppDir: true,
      file: 'page.tsx',
    },
    {
      path: 'app',
      file: 'not-found.tsx',
    },
    {
      path: 'admin',
      isInsideAppDir: true,
      file: 'layout.tsx',
    },
    {
      path: join('admin', '(auth)'),
      isInsideAppDir: true,
      file: 'layout.tsx',
    },
    {
      path: '(main)',
      isInsideAppDir: true,
      file: 'page.tsx',
    },
    {
      path: join('plugins', 'core', 'langs'),
      file: 'en.json',
    },
    {
      path: join('plugins', 'admin', 'langs'),
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
    const appPath = join(
      frontendAppPath,
      folder.isInsideAppDir ? localePath : '',
      folder.path,
    );
    const packagePath = join(
      frontendPackagePath,
      folder.isInsideAppDir ? join('app', '[locale]') : '',
      folder.path,
    );

    if (!fs.existsSync(packagePath)) {
      console.error(
        `${initConsole} ⛔️ "${packagePath}" folder does not exist in the frontend package. Please report this issue to the VitNode GitHub.`,
      );
      process.exit(1);
    }

    fs.cpSync(packagePath, appPath, { recursive: true });
  });

  // Copy folders if don't exist
  pathsToFoldersOptional.forEach(folder => {
    const appPath = join(
      frontendAppPath,
      folder.isInsideAppDir ? localePath : '',
      folder.path,
    );
    const packagePath = join(
      frontendPackagePath,
      folder.isInsideAppDir ? join('app', '[locale]') : '',
      folder.path,
    );

    if (!fs.existsSync(packagePath)) {
      console.error(
        `${initConsole} ⛔️ "${packagePath}" folder does not exist in the frontend package. Please report this issue to the VitNode GitHub.`,
      );
      process.exit(1);
    }

    const files = getAllFiles(packagePath);

    files.forEach(file => {
      const dir = file.dir.replace(packagePath, '');
      const appFilePath = dir ? join(appPath, dir) : join(appPath);
      const packageFilePath = dir
        ? join(
            frontendPackagePath,
            folder.isInsideAppDir ? join('app', '[locale]') : '',
            folder.path,
            dir,
            file.name,
          )
        : join(
            frontendPackagePath,
            folder.isInsideAppDir ? join('app', '[locale]') : '',
            folder.path,
            file.name,
          );

      if (!fs.existsSync(join(appFilePath, file.name))) {
        fs.mkdirSync(appFilePath, { recursive: true });
        fs.copyFileSync(packageFilePath, join(appFilePath, file.name));
      }
    });
  });

  pathsToFile.forEach(file => {
    const appPath = join(
      frontendAppPath,
      file.isInsideAppDir ? localePath : '',
      file.path,
    );
    const packagePath = join(
      frontendPackagePath,
      file.isInsideAppDir ? join('app', '[locale]') : '',
      file.path,
    );

    if (!fs.existsSync(packagePath)) {
      console.log(
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
  init();
}
