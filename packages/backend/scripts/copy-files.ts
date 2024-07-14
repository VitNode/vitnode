/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';

export const copyFiles = ({ pluginsPath }: { pluginsPath: string }) => {
  const currentPathToCoreAdmin = path.join(pluginsPath, 'core', 'admin');
  if (fs.existsSync(currentPathToCoreAdmin)) {
    fs.rmSync(currentPathToCoreAdmin, { recursive: true });
  }
  fs.mkdirSync(currentPathToCoreAdmin, { recursive: true });

  // Copy core plugin
  const currentPathToSchema = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'plugins',
  );
  if (!fs.existsSync(currentPathToSchema)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${currentPathToSchema}"`,
    );
    process.exit(1);
  }

  fs.cpSync(currentPathToSchema, pluginsPath, { recursive: true });
};
