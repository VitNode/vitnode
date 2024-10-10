#!/usr/bin/env node
/* eslint-disable no-console */

import * as fs from 'fs';
import { join } from 'path';

import { checkFilesAndFilterIfExist } from './helpers/check-files-and-filter-if-exist';

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

  const packagePath = join(__dirname, '..', '..', 'folders_to_copy');
  if (!fs.existsSync(packagePath)) {
    console.log(
      `${initConsole} ⛔️ The frontend package cannot find "folders_to_copy" folder. Please report this issue to the VitNode GitHub.`,
    );
    process.exit(1);
  }

  // Stage 1 - Force files to copy
  const forcePathFiles: {
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

  // Stage 2 - Force files
  forcePathFiles.forEach(file => {
    const packageFromCopyPath = join(packagePath, file.path, file.file);
    const rootToCopyPath = join(process.cwd(), file.path);

    if (!fs.existsSync(packageFromCopyPath)) {
      console.error(
        `${initConsole} ⛔️ "${packageFromCopyPath}" file does not exist in the frontend package. Please report this issue to the VitNode GitHub.`,
      );
      process.exit(1);
    }

    if (!fs.existsSync(rootToCopyPath)) {
      fs.mkdirSync(rootToCopyPath, { recursive: true });
    }
  });

  // Stage 3 - Force copy folders
  const forceCopyFolders = [
    join('src', 'app', '[locale]', 'admin', '(vitnode)'),
    join('src', 'app', '[locale]', 'admin', '(auth)', '(vitnode)'),
  ];

  // Stage 4 - Force folders
  forceCopyFolders.forEach(folder => {
    const packageFromCopyPath = join(packagePath, folder);
    const rootToCopyPath = join(process.cwd(), folder);

    fs.cpSync(packageFromCopyPath, rootToCopyPath, { recursive: true });
  });

  // Stage 5 - Copy folders if not exist
  const foldersOptional = checkFilesAndFilterIfExist({
    packagesFromCopyPath: packagePath,
    dirPath: join(process.cwd(), 'src', 'app'),
  });

  foldersOptional.forEach(folders => {
    const packageFromCopyPath = join(packagePath, folders);
    const rootToCopyPath = join(process.cwd(), folders);

    fs.cpSync(packageFromCopyPath, rootToCopyPath, { recursive: true });
  });

  console.log(`${initConsole} ✅ Frontend files copied successfully.`);
  process.exit(0);
};

if (process.argv[2] === 'init') {
  init({ dev: false });
} else if (process.argv[2] === 'dev') {
  init({ dev: true });
}
