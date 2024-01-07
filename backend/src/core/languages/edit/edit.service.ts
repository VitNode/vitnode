import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { ShowCoreLanguages } from '../show/dto/show.obj';
import { EditCoreLanguagesArgs } from './dto/edit.args';

import { ConfigType } from '@/types/config.type';
import { DatabaseService } from '@/database/database.service';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { core_languages } from '@/src/admin/core/database/schema/languages';

@Injectable()
export class EditCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async edit({ id, ...rest }: EditCoreLanguagesArgs): Promise<ShowCoreLanguages> {
    const configFile = fs.readFileSync(join('..', 'config.json'), 'utf8');
    const config: ConfigType = JSON.parse(configFile);

    const language = await this.databaseService.db.query.core_languages.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!language) {
      throw new NotFoundError('Language');
    }

    const dataToEditConfig = config;

    // Edit default language
    if (rest.default) {
      dataToEditConfig.languages.default = id;

      // Disable previous default language
      await this.databaseService.db
        .update(core_languages)
        .set({ default: false })
        .where(eq(core_languages.default, true));
    }

    const edit = await this.databaseService.db
      .update(core_languages)
      .set(rest)
      .where(eq(core_languages.id, id))
      .returning()[0];

    if (rest.default) {
      dataToEditConfig.languages.default = edit.default ? edit.id : config.languages.default;
    }

    // Edit enabled status
    dataToEditConfig.languages.locales.find(locale => locale.key === edit.id).enabled =
      edit.enabled;

    fs.writeFile(
      join('..', 'config.json'),
      JSON.stringify(dataToEditConfig, null, 2),
      'utf8',
      err => {
        if (err) throw err;
      }
    );

    return edit;
  }
}
