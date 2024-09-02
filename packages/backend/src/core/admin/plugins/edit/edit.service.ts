import { core_plugins } from '@/database/schema/plugins';
import { CustomError, NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq, ne } from 'drizzle-orm';
import * as fs from 'fs';

import { ABSOLUTE_PATHS_BACKEND, ConfigPlugin } from '../../../..';
import { ShowAdminPlugins } from '../show/show.dto';
import { EditAdminPluginsArgs } from './edit.dto';

@Injectable()
export class EditAdminPluginsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async edit({
    code,
    default: isDefault = false,
    ...rest
  }: EditAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!plugin) {
      throw new NotFoundError('Plugin');
    }

    if (code !== plugin.code) {
      throw new CustomError({
        code: 'PLUGIN_CODE_MISMATCH',
        message: 'Plugin code mismatch!',
      });
    }

    if (isDefault) {
      if (!plugin.enabled) {
        throw new CustomError({
          code: 'PLUGIN_NOT_ENABLED',
          message: 'Plugin is not enabled!',
        });
      }

      // Set all other plugins to default: false
      await this.databaseService.db
        .update(core_plugins)
        .set({
          default: false,
        })
        .where(ne(core_plugins.code, code));
    }

    const updatePlugin = await this.databaseService.db
      .update(core_plugins)
      .set({
        ...rest,
        default: isDefault,
      })
      .where(eq(core_plugins.code, code))
      .returning();

    // Update config.json
    const path = ABSOLUTE_PATHS_BACKEND.plugin({ code }).config;
    const pluginFile = fs.readFileSync(path, 'utf8');
    const config: Omit<ConfigPlugin, 'version_code' | 'versions'> =
      JSON.parse(pluginFile);

    config.name = rest.name;
    config.description = rest.description;
    config.author = rest.author;
    config.author_url = rest.author_url;
    config.support_url = rest.support_url;

    fs.writeFile(path, JSON.stringify(config, null, 2), err => {
      if (err) {
        throw new CustomError({
          code: 'CANNOT_WRITE_FILE',
          message: `Cannot write file with "${path}" path!`,
        });
      }
    });

    return updatePlugin[0];
  }
}
