import { exec } from 'child_process';

const execShellCommand = async (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      }
      const result = stdout ? stdout : stderr;

      resolve(result);
    });
  });
};

export const generateDatabaseMigrations = async () => {
  try {
    await execShellCommand(
      'npm run drizzle-kit up && npm run drizzle-kit generate',
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};

export const runMigrations = async () => {
  try {
    await execShellCommand('npm run drizzle-kit migrate');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(1);
  }
};
