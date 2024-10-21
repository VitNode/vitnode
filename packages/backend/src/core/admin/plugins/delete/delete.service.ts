import { core_files_using } from '@/database/schema/files';
import { core_languages_words } from '@/database/schema/languages';
import { core_plugins } from '@/database/schema/plugins';
import { CustomError, NotFoundError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND } from '@/index';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';

import { ChangeFilesAdminPluginsService } from '../helpers/files/change/change.service';

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

  async delete({ code }: { code: string }): Promise<string> {
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
    await this.changeFilesService.changeFiles({ code, action: 'delete' });

    const modulePath = ABSOLUTE_PATHS_BACKEND.plugin({ code }).root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = ['admin_pages', 'pages', 'plugin'] as const;
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend[path],
      );
    });
    await this.changeFilesService.setServerToRestartConfig();

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    // Delete i18n
    await this.databaseService.db
      .delete(core_languages_words)
      .where(eq(core_languages_words.plugin_code, code));

    // Delete using files
    await this.databaseService.db
      .delete(core_files_using)
      .where(eq(core_files_using.plugin, code));

    return 'Success!';
  }
}
