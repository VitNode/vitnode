import { core_plugins } from '@/database/schema/plugins';
import { CustomError, NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, execShellCommand } from '@/index';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

import { ChangeFilesAdminPluginsService } from '../helpers/files/change/change.service';
import { DeleteAdminPluginsArgs } from './dto/delete.args';

@Injectable()
export class DeleteAdminPluginsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService,
  ) {}

  protected deleteFolderWhenExists(path: string) {
    if (fs.existsSync(path)) {
      fs.rmSync(path, { recursive: true });
    }
  }

  async delete({ code }: DeleteAdminPluginsArgs): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!plugin) {
      throw new NotFoundError('Plugin');
    }

    if (plugin.default) {
      throw new CustomError({
        code: 'DEFAULT_PLUGIN',
        message: 'This plugin is default and cannot be deleted',
      });
    }

    // Change files when delete
    this.changeFilesService.changeFilesWhenDelete({ code });

    const modulePath = ABSOLUTE_PATHS_BACKEND.plugin({ code }).root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = ['admin_pages', 'pages', 'plugin'] as const;
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend[path],
      );
    });

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    // Generate migration
    try {
      await execShellCommand(
        'npm run drizzle-kit up && npm run drizzle-kit generate',
      );
    } catch (_) {
      throw new CustomError({
        code: 'GENERATE_MIGRATION_ERROR',
        message: 'Error generating migration',
      });
    }

    return 'Success!';
  }
}
