import type { ChildProcess, SpawnOptions } from "node:child_process";

import { spawn } from "node:child_process";

export const spawnCommand = (
  command: string,
  args: string[] = [],
  options: Omit<SpawnOptions, "shell"> = {},
): ChildProcess => {
  const spawnOptions: SpawnOptions = { ...options, shell: false };

  return process.platform === "win32"
    ? spawn("cmd.exe", ["/c", command, ...args], spawnOptions)
    : spawn(command, args, spawnOptions);
};
