import { core_languages } from '@/database/schema/languages';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  CustomError,
  getConfigFile,
  NotFoundError,
} from '../../../..';
import { ShowCoreLanguages } from '../../../languages/show/show.dto';
import { CreateCoreAdminLanguagesArgs } from './create.dto';

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
        ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend.languages,
        `${pluginCode}.json`,
      );
      if (fs.existsSync(path)) return;

      fs.cpSync(
        join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend
            .languages,
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

    return newLanguage[0];
  }
}
