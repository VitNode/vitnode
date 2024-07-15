import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export const getAllFiles = (dir: string): { name: string; dir: string }[] => {
  return readdirSync(dir).reduce<{ name: string; dir: string }[]>(
    (files, file) => {
      const name = join(dir, file);
      const isDirectory = statSync(name).isDirectory();
      const fileInfo = {
        name: file,
        dir: isDirectory ? name : dir,
      };
      return isDirectory
        ? [...files, ...getAllFiles(name)]
        : [...files, fileInfo];
    },
    [],
  );
};
