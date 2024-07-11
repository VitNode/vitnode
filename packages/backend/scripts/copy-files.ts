/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';

export const copyFiles = ({ pluginsPath }: { pluginsPath: string }) => {
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
