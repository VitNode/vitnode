/* eslint-disable no-console */
import { spawn } from 'child_process';

// Function to run commands interactively with the ability to handle user input
const runInteractiveShellCommand = async (cmd: string, args: string[] = []) => {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: true });

    child.on('error', error => {
      reject(error);
    });

    child.on('close', code => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve(true);
      }
    });
  });
};

export const generateDatabaseMigrations = async () => {
  try {
    await runInteractiveShellCommand('npm', ['run', 'drizzle-kit', 'up']);
    await runInteractiveShellCommand('npm', ['run', 'drizzle-kit', 'generate']);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export const runMigrations = async () => {
  try {
    await runInteractiveShellCommand('npm', ['run', 'drizzle-kit', 'migrate']);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
