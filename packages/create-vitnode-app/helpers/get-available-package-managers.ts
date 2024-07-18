import { exec } from 'child_process';

export type PackageManager = 'npm' | 'pnpm';

export const execShellCommand = async (
  cmd: string,
): Promise<string | undefined> => {
  return new Promise(resolve => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        resolve(undefined);
      }
      const result = stdout ? stdout : stderr;

      resolve(result.replace(/\s+/g, ''));
    });
  });
};

export const getAvailablePackageManagers = async (): Promise<
  Record<PackageManager, string | undefined>
> => {
  const [npm, pnpm] = await Promise.all([
    execShellCommand('npm --version'),
    execShellCommand('pnpm --version'),
  ]);

  return {
    pnpm,
    npm,
  };
};
