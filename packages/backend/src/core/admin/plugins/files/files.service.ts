import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ABSOLUTE_PATHS_BACKEND } from '../../../..';
import { FilesAdminPluginsObj } from './files.dto';

@Injectable()
export class FilesAdminPluginsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  protected async checkNumberOfFiles({
    paths,
  }: {
    paths: string;
  }): Promise<number> {
    return fs.existsSync(paths)
      ? (await fs.promises.readdir(paths, { recursive: true })).filter(
          fileName => fileName.includes('.'),
        ).length
      : 0;
  }

  async check({ code }: { code: string }): Promise<FilesAdminPluginsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!plugin) {
      throw new NotFoundError('Plugin');
    }

    const pluginPaths = ABSOLUTE_PATHS_BACKEND.plugin({ code });

    return {
      databases: await this.checkNumberOfFiles({
        paths: pluginPaths.database.schema,
      }),
      admin_pages: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.admin_pages,
      }),
      admin_templates: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.admin_templates,
      }),
      pages: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.pages,
      }),
      default_page: fs.existsSync(pluginPaths.frontend.default_page),
      templates: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.templates,
      }),
    };
  }
}
