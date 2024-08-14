import { exec } from 'child_process';

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

export const generateDatabaseMigrations = async () => {
  await execShellCommand(
    'npm run drizzle-kit up && npm run drizzle-kit generate',
  );
};

export const runMigrations = async () => {
  await execShellCommand('npm run drizzle-kit migrate');
};
