import { exec } from "child_process";

export const execShellCommand = (cmd: string) => {
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
