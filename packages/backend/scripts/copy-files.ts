/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';

export const copyFiles = ({ pluginsPath }: { pluginsPath: string }) => {
  const currentPathToCoreAdmin = path.join(
    pluginsPath,
    'core',
    'admin',
    'database',
  );
  if (fs.existsSync(currentPathToCoreAdmin)) {
    fs.rmSync(path.join(currentPathToCoreAdmin, 'index.ts'), {
      recursive: true,
    });
    fs.rmSync(path.join(currentPathToCoreAdmin, 'schema'), {
      recursive: true,
    });
  }
  fs.mkdirSync(currentPathToCoreAdmin, { recursive: true });

  // Copy core plugin
  const currentPathToSchema = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'database',
  );
  if (!fs.existsSync(currentPathToSchema)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${currentPathToSchema}"`,
    );
    process.exit(1);
  }

  fs.cpSync(currentPathToSchema, currentPathToCoreAdmin, { recursive: true });
};
