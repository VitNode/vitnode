import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { EditCoreAdminLanguagesArgs } from './dto/edit.args';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { ShowCoreLanguages } from '../../../languages/show/dto/show.obj';
import { NotFoundError } from '@/errors';
import { core_languages } from '@/database/schema/languages';
import { configPath, ConfigType, getConfigFile } from '@/providers';

@Injectable()
export class EditAdminCoreLanguagesService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async edit({
    id,
    ...rest
  }: EditCoreAdminLanguagesArgs): Promise<ShowCoreLanguages> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.id, id),
      });

    if (!language) {
      throw new NotFoundError('Language');
    }

    // Update config file
    const config: ConfigType = getConfigFile();
    if (rest.default) {
      config.langs.forEach(lang => {
        lang.default = false;
      });
    }

    config.langs = config.langs.map(lang => {
      if (lang.code === language.code) {
        return { ...lang, ...rest };
      }

      return lang;
    });
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

    // Edit default language
    if (rest.default) {
      // Disable previous default language
      await this.databaseService.db
        .update(core_languages)
        .set({ default: false })
        .where(eq(core_languages.default, true));
    }

    const editData = await this.databaseService.db
      .update(core_languages)
      .set({ ...rest, updated: new Date() })
      .where(eq(core_languages.id, id))
      .returning();

    const edit = editData[0];

    return edit;
  }
}
