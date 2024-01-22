import { mkdirSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import { changeModuleRootSchema, createModuleSchema } from './contents';

// TODO: Remove this
const code = 'commerce';

@Injectable()
export class CreateAdminPluginsService {
  constructor() {}

  async create(): Promise<string> {
    const folders: { files: { content: string; name: string }[]; path: string }[] = [
      {
        path: `src/${code}`,
        files: [
          {
            name: `${code}.module.ts`,
            content: createModuleSchema({ code })
          }
        ]
      },
      {
        path: `src/admin/${code}`,
        files: [
          {
            name: `${code}.module.ts`,
            content: createModuleSchema({ code, admin: true })
          }
        ]
      }
    ];

    // Check if folder exists
    // pathFolders.forEach(path => {
    //   if (existsSync(path)) {
    //     throw new CustomError({
    //       code: 'PLUGIN_ALREADY_EXISTS',
    //       message: `Plugin already exists with "${code}" code!`
    //     });
    //   }
    // });

    folders.forEach(folder => {
      mkdirSync(folder.path, { recursive: true });

      folder.files.forEach(file => {
        writeFile(`${folder.path}/${file.name}`, file.content);
      });
    });

    // Import module
    const pathModules = `src/modules.module.ts`;
    const moduleContent = readFileSync(pathModules, 'utf8');
    if (!moduleContent.includes(`./${code}/${code}.module`)) {
      await writeFile(
        pathModules,
        changeModuleRootSchema({
          content: moduleContent,
          code
        })
      );
    }

    // Import module in admin
    const pathAdminModules = `src/admin/admin.module.ts`;
    const adminModuleContent = readFileSync(pathAdminModules, 'utf8');
    if (!adminModuleContent.includes(`./${code}/${code}.module`)) {
      await writeFile(
        pathAdminModules,
        changeModuleRootSchema({
          content: adminModuleContent,
          code,
          admin: true
        })
      );
    }

    return `${__dirname} - Hello World!`;
  }
}
