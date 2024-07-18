import { rm } from 'fs/promises';
import { join } from 'path';
import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteCoreAdminLanguagesArgs } from './dto/delete.args';

import { DatabaseService } from '@/utils/database/database.service';
import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  getConfigFile,
} from '../../../..';
import { core_languages } from '@/plugins/core/admin/database/schema/languages';
import { setRebuildRequired } from '@/functions/rebuild-required';
@Injectable()
export class DeleteAdminCoreLanguageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async delete({ code }: DeleteCoreAdminLanguagesArgs): Promise<string> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (table, { eq }) => eq(table.code, code),
      });

    if (!language) {
      throw new NotFoundError('Language');
    }

    if (language.protected) {
      throw new CustomError({
        code: 'PROTECTED_LANGUAGE',
        message: 'This language is protected and cannot be deleted',
      });
    }

    if (language.default) {
      throw new CustomError({
        code: 'DEFAULT_LANGUAGE',
        message: 'This language is default and cannot be deleted',
      });
    }

    const plugins = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (table, { desc }) => desc(table.updated),
      columns: {
        code: true,
      },
    });

    [...plugins, { code: 'core' }, { code: 'admin' }].forEach(async plugin => {
      fs.unlinkSync(
        join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend
            .language,
          `${code}.json`,
        ),
      );
    });

    // Remove assets
    const assetsPath = join(
      ABSOLUTE_PATHS_BACKEND.uploads.public,
      'assets',
      code,
    );
    rm(assetsPath, { recursive: true });

    // Update config file
    const config: ConfigType = getConfigFile();
    config.langs = config.langs.filter(lang => lang.code !== code);
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');

    await this.databaseService.db
      .delete(core_languages)
      .where(eq(core_languages.code, code));

    await setRebuildRequired({ set: 'langs' });

    return 'Success!';
  }
}
