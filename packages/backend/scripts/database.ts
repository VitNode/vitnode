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
    'npx drizzle-kit@0.23.1 up && npx drizzle-kit@0.23.1 generate',
  );
};

export const runMigrations = async () => {
  await execShellCommand('npx drizzle-kit@0.23.1 migrate');
};
