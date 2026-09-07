import { spawnCommand } from "./spawn-command.js";

export const runInteractiveShellCommand = async (
  cmd: string,
  args: string[] = [],
) => {
  return await new Promise((resolve, reject) => {
    const child = spawnCommand(cmd, args, {
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", error => {
      reject(error);
    });

    child.on("close", code => {
      if (code !== 0) {
        reject(new Error(`Command failed with exit code ${code}`));
      } else {
        resolve(true);
      }
    });
  });
};
