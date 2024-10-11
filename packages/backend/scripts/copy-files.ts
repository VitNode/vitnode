/* eslint-disable no-console */
import * as fs from 'fs';
import * as path from 'path';

export const copyFiles = ({ pluginsPath }: { pluginsPath: string }) => {
  const currentPathToCoreAdmin = path.join(
    pluginsPath,
    'core',
    'admin',
    'database',
  );

  // Check if the directory exists before trying to remove files
  if (fs.existsSync(currentPathToCoreAdmin)) {
    const indexFilePath = path.join(currentPathToCoreAdmin, 'index.ts');
    const schemaPath = path.join(currentPathToCoreAdmin, 'schema');

    // Remove the index.ts file if it exists
    if (fs.existsSync(indexFilePath)) {
      fs.rmSync(indexFilePath, { recursive: true });
    }

    // Remove the schema directory if it exists
    if (fs.existsSync(schemaPath)) {
      fs.rmSync(schemaPath, { recursive: true });
    }
  }

  // Create the directory if it doesn't exist
  fs.mkdirSync(currentPathToCoreAdmin, { recursive: true });

  // Copy core plugin
  const currentPathToSchema = path.join(
    __dirname,
    '..',
    '..',
    'src',
    'database',
  );

  // Check if the source directory exists before copying
  if (!fs.existsSync(currentPathToSchema)) {
    console.log(
      `⛔️ Plugins not found in 'src/plugins' directory. "${currentPathToSchema}"`,
    );
    process.exit(1);
  }

  // Copy the schema directory to the core admin path
  fs.cpSync(currentPathToSchema, currentPathToCoreAdmin, { recursive: true });
};
