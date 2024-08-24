import { readdirSync, statSync } from 'fs';
import { join } from 'path';

export const getAllFiles = (dir: string): { dir: string; name: string }[] => {
  return readdirSync(dir).reduce<{ dir: string; name: string }[]>(
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
