import {
  ABSOLUTE_PATHS_BACKEND,
  CustomError,
  PluginInfoJSONType,
} from '@/index';
import { Injectable } from '@nestjs/common';
import { existsSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';

import {
  createDefaultPage,
  createInfoJSON,
  createModuleAdminSchema,
  createModuleSchema,
} from './contents';

@Injectable()
export class CreateFilesAdminPluginsService {
  async createFiles({ code, ...rest }: PluginInfoJSONType) {
    const folders: {
      files: { content: string; name: string }[];
      path: string;
    }[] = [
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).root,
        files: [
          {
            name: `${code}.module.ts`,
            content: createModuleSchema({ code }),
          },
          {
            name: 'config.json',
            content: createInfoJSON({ ...rest, code, allow_default: true }),
          },
        ],
      },
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.templates,
        files: [
          {
            name: 'default-page.tsx',
            content: createDefaultPage({ code }),
          },
        ],
      },
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).admin,
        files: [
          {
            name: 'admin.module.ts',
            content: createModuleAdminSchema({ code }),
          },
        ],
      },
      {
        path: ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.init,
        files: [
          {
            name: 'index.ts',
            content: `export default {};\n`,
          },
        ],
      },
    ];

    // Check if folder exists
    folders.forEach(folder => {
      if (existsSync(folder.path)) {
        throw new CustomError({
          code: 'PLUGIN_ALREADY_EXISTS',
          message: `Plugin already exists in filesystem with "${code}" code!`,
        });
      }
    });

    await Promise.all(
      folders.map(async folder => {
        // Create folders
        await mkdir(folder.path, { recursive: true });

        // Create files
        await Promise.all(
          folder.files.map(async file => {
            try {
              await writeFile(join(folder.path, file.name), file.content);
            } catch (err) {
              const error = err as Error;
              throw new CustomError({
                code: 'ERROR_CREATING_FILE',
                message: error.message,
              });
            }
          }),
        );
      }),
    );
  }
}
