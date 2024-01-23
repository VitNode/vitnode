import { mkdirSync, readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import { changeModuleRootSchema, createModuleSchema } from './contents';
import { CreateAdminPluginsArgs } from './dto/create.args';
import { ShowAdminPlugins } from '../show/dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { CustomError } from '@/utils/errors/CustomError';
import { core_plugins } from '../../database/schema/plugins';
import { currentDate } from '@/functions/date';

@Injectable()
export class CreateAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    author,
    author_url,
    code,
    description,
    name,
    support_url
  }: CreateAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (plugin) {
      throw new CustomError({
        code: 'PLUGIN_ALREADY_EXISTS',
        message: `Plugin already exists with "${code}" code!`
      });
    }

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

    const findPluginWithLastPosition = await this.databaseService.db.query.core_plugins.findFirst({
      orderBy: (table, { desc }) => desc(table.position)
    });

    const data = await this.databaseService.db
      .insert(core_plugins)
      .values({
        code,
        description,
        name,
        support_url,
        author,
        author_url,
        updated: currentDate(),
        uploaded: currentDate(),
        position: findPluginWithLastPosition ? findPluginWithLastPosition.position + 1 : 0
      })
      .returning();

    return data[0];
  }
}
