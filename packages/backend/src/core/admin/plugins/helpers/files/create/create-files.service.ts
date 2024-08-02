import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import {
  createDefaultPage,
  createFunctionsDatabase,
  createInfoJSON,
  createModuleAdminSchema,
  createModuleSchema,
} from './contents';

import {
  ABSOLUTE_PATHS_BACKEND,
  CustomError,
  PluginInfoJSONType,
} from '@/index';

@Injectable()
export class CreateFilesAdminPluginsService {
  createFiles({ code, ...rest }: PluginInfoJSONType): void {
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
          {
            name: 'functions.ts',
            content: createFunctionsDatabase(),
          },
        ],
      },
    ];

    // Check if folder exists
    folders.forEach(folder => {
      if (fs.existsSync(folder.path)) {
        throw new CustomError({
          code: 'PLUGIN_ALREADY_EXISTS',
          message: `Plugin already exists in filesystem with "${code}" code!`,
        });
      }
    });

    folders.forEach(folder => {
      // Create folders
      fs.mkdirSync(folder.path, { recursive: true });

      // Create files
      folder.files.forEach(file => {
        fs.writeFile(join(folder.path, file.name), file.content, err => {
          if (err) {
            throw new CustomError({
              code: 'ERROR_CREATING_FILE',
              message: err.message,
            });
          }
        });
      });
    });
  }
}
