import { join } from 'path';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowSettingsObj } from './dto/show.obj';
import { ManifestWithLang } from '../settings.module';

import { DatabaseService } from '@/utils/database/database.service';
import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '../../..';
import { core_languages } from '../../../database/schema/languages';

@Injectable()
export class ShowSettingsService {
  constructor(private readonly databaseService: DatabaseService) {}

  protected getManifest({
    langCodes,
  }: {
    langCodes: string[];
  }): ManifestWithLang[] {
    return langCodes.map(lang => {
      const path = join(
        ABSOLUTE_PATHS_BACKEND.uploads.public,
        'assets',
        lang,
        'manifest.webmanifest',
      );
      const data = fs.readFileSync(path, 'utf8');
      const manifest: ManifestWithLang = JSON.parse(data);

      return manifest;
    });
  }

  async show(): Promise<ShowSettingsObj> {
    const config = getConfigFile();

    const languages = await this.databaseService.db
      .select({
        code: core_languages.code,
        enabled: core_languages.enabled,
        site_copyright: core_languages.site_copyright,
      })
      .from(core_languages);
    const enabledLanguages = languages.filter(item => item.enabled);
    const manifest = this.getManifest({
      langCodes: enabledLanguages.map(item => item.code),
    });

    return {
      ...config.settings.general,
      site_description: manifest.map(item => ({
        language_code: item.lang,
        value: item.description,
      })),
      site_copyright: enabledLanguages.map(item => ({
        language_code: item.code,
        value: item.site_copyright ?? '',
      })),
    };
  }
}
