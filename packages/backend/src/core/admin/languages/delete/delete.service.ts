import { core_languages } from '@/database/schema/languages';
import { CustomError, NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { existsSync } from 'fs';
import { rm, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

import {
  ABSOLUTE_PATHS_BACKEND,
  configPath,
  ConfigType,
  getConfigFile,
} from '../../../..';
@Injectable()
export class DeleteAdminCoreLanguageService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async delete({ code }: { code: string }): Promise<string> {
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

    await Promise.all(
      [...plugins, { code: 'core' }, { code: 'admin' }].map(async plugin => {
        const path = join(
          ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend
            .languages,
          `${code}.json`,
        );

        if (!existsSync(path)) {
          return;
        }

        await unlink(path);
      }),
    );

    // Remove assets
    const assetsPath = join(
      ABSOLUTE_PATHS_BACKEND.uploads.public,
      'assets',
      code,
    );

    await rm(assetsPath, { recursive: true });

    // Update config file
    const config: ConfigType = getConfigFile();
    config.langs = config.langs.filter(lang => lang.code !== code);
    await writeFile(configPath, JSON.stringify(config, null, 2), 'utf-8');

    await this.databaseService.db
      .delete(core_languages)
      .where(eq(core_languages.code, code));

    return 'Success!';
  }
}
