import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';

import { DeleteAdminPluginsArgs } from './dto/delete.args';
import { ChangeFilesAdminPluginsService } from '../helpers/files/change/change.service';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { CustomError, NotFoundError } from '@/errors';
import { core_migrations } from '@/database/schema/files';
import { ABSOLUTE_PATHS_BACKEND } from '@/index';
import { core_plugins } from '@/database/schema/plugins';
import { setRebuildRequired } from '@/functions/rebuild-required';

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

    // Drop tables
    const tables: { getTables: () => string[] } = await import(
      join(
        process.cwd(),
        'dist',
        'plugins',
        code,
        'admin',
        'database',
        'functions.js',
      )
    );
    const deleteQueries = tables.getTables().map(table => {
      return `DROP TABLE IF EXISTS ${table} CASCADE;`;
    });

    try {
      await this.databaseService.db.execute(sql.raw(deleteQueries.join(' ')));
    } catch (error) {
      throw new CustomError({
        code: 'DELETE_TABLE_ERROR',
        message: `Error deleting tables for plugin ${code}`,
      });
    }
    // Delete migrations
    await this.databaseService.db
      .delete(core_migrations)
      .where(eq(core_migrations.plugin, code));

    // Change files when delete
    this.changeFilesService.changeFilesWhenDelete({ code });

    const modulePath = ABSOLUTE_PATHS_BACKEND.plugin({ code }).root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = ['admin_pages', 'pages', 'plugin'];
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend[path],
      );
    });

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    await setRebuildRequired({ set: 'plugins' });

    return 'Success!';
  }
}
