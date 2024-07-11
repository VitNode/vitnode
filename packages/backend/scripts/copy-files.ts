/* eslint-disable no-console */
import * as path from 'path';
import * as fs from 'fs';

export const copyFiles = ({ corePluginPath }: { corePluginPath: string }) => {
  const currentPathToSchema = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'templates',
    'core',
    'admin',
    'database',
  );
  if (!fs.existsSync(currentPathToSchema)) {
    console.log(
      `⛔️ Database schema not found in 'templates/core/admin/database' directory. "${currentPathToSchema}"`,
    );
    process.exit(1);
  }

  const userPathToSchema = path.join(corePluginPath, 'admin', 'database');
  fs.cpSync(currentPathToSchema, userPathToSchema, { recursive: true });
};
