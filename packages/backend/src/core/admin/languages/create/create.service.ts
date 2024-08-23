import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';

import { CreateCoreAdminLanguagesArgs } from './dto/create.args';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  CustomError,
  getConfigFile,
  NotFoundError,
} from '../../../..';
import { core_languages } from '@/database/schema/languages';
import { ShowCoreLanguages } from '../../../languages/show/dto/show.obj';
import { setRebuildRequired } from '@/functions/rebuild-required';

@Injectable()
export class CreateAdminCoreLanguageService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  private async cloneLangInPlugins(pluginCode: string) {
    const plugins = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (table, { desc }) => desc(table.updated),
      columns: {
        code: true,
      },
    });

    [...plugins, { code: 'core' }, { code: 'admin' }].forEach(plugin => {
      const path = join(
        ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend.language,
        `${pluginCode}.json`,
      );
      if (fs.existsSync(path)) return;

      fs.cpSync(
        join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend
            .language,
          'en.json',
        ),
        path,
        { recursive: true },
      );
    });
  }

  async create({
    code,
    locale,
    name,
    time_24,
    timezone,
  }: CreateCoreAdminLanguagesArgs): Promise<ShowCoreLanguages> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.code, code),
      });

    if (language) {
      throw new CustomError({
        code: 'LANGUAGE_ALREADY_EXISTS',
        message: 'Language already exists',
      });
    }

    await this.cloneLangInPlugins(code);

    // Clone JSON for manifest
    fs.cpSync(
      join(
        ABSOLUTE_PATHS_BACKEND.uploads.public,
        'assets',
        'en',
        'manifest.webmanifest',
      ),
      join(
        ABSOLUTE_PATHS_BACKEND.uploads.public,
        'assets',
        code,
        'manifest.webmanifest',
      ),
    );

    // Update config file
    const config: ConfigType = getConfigFile();
    config.langs.push({
      code,
      enabled: true,
      default: false,
    });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

    const defaultLanguage =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.code, 'en'),
      });

    if (!defaultLanguage) {
      throw new NotFoundError('Default language');
    }

    const newLanguage = await this.databaseService.db
      .insert(core_languages)
      .values({
        code,
        name,
        timezone,
        default: false,
        protected: false,
        enabled: true,
        time_24,
        locale,
        site_copyright: defaultLanguage.site_copyright,
      })
      .returning();

    setRebuildRequired({ set: 'langs' });

    return newLanguage[0];
  }
}
