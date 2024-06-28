import { exec } from 'child_process';
import * as fs from 'fs';

const execShellCommand = async (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      const result = stdout ? stdout : stderr;
      // eslint-disable-next-line no-console
      console.log(result);

      resolve(result);
    });
  });
};

export const generateDatabaseMigrations = async ({
  pluginsPath,
}: {
  pluginsPath: string;
}) => {
  await Promise.all(
    fs
      .readdirSync(pluginsPath)
      .filter(plugin => plugin !== 'plugins.module.ts')
      .map(async plugin => {
        await execShellCommand(
          `npx drizzle-kit up --config src/plugins/${plugin}/admin/database/drizzle.config.ts && npx drizzle-kit generate --config src/plugins/${plugin}/admin/database/drizzle.config.ts`,
        );
      }),
  );
};
