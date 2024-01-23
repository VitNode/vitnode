import { readFileSync } from 'fs';
import { rm, writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { removeModuleFromRootSchema } from './contents';
import { DeleteAdminPluginsArgs } from './dto/delete.args';

import { DatabaseService } from '@/database/database.service';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { core_plugins } from '../../database/schema/plugins';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class DeleteAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async delete({ code }: DeleteAdminPluginsArgs): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError('Plugin');
    }

    if (plugin.protected) {
      throw new CustomError({
        code: 'PROTECTED_PLUGIN',
        message: 'This plugin is protected and cannot be deleted'
      });
    }

    if (plugin.default) {
      throw new CustomError({
        code: 'DEFAULT_PLUGIN',
        message: 'This plugin is default and cannot be deleted'
      });
    }

    const pathModules = `src/modules.module.ts`;
    const moduleContent = readFileSync(pathModules, 'utf8');
    await writeFile(
      pathModules,
      removeModuleFromRootSchema({
        content: moduleContent,
        code
      })
    );

    const pathAdminModules = `src/admin/admin.module.ts`;
    const adminModuleContent = readFileSync(pathAdminModules, 'utf8');

    await writeFile(
      pathAdminModules,
      removeModuleFromRootSchema({
        content: adminModuleContent,
        code,
        admin: true
      })
    );

    rm(`src/${code}`, { recursive: true });
    rm(`src/admin/${code}`, { recursive: true });

    await this.databaseService.db.delete(core_plugins).where(eq(core_plugins.code, code));

    return 'DeleteAdminPluginsService';
  }
}
