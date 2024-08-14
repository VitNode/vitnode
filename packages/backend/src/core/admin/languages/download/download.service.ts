import { join } from 'path';
import * as fs from 'fs';
import { copyFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';
import * as tar from 'tar';

import { DownloadCoreAdminLanguagesArgs } from './dto/download.args';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { User } from '@/decorators';
import { CustomError, NotFoundError } from '@/errors';
import {
  ABSOLUTE_PATHS_BACKEND,
  currentUnixDate,
  removeSpecialCharacters,
} from '../../../..';
import { generateRandomString } from '@/functions/generate-random-string';

@Injectable()
export class DownloadAdminCoreLanguageService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async download(
    { id: userId }: User,
    { code, plugins: pluginsToInclude }: DownloadCoreAdminLanguagesArgs,
  ): Promise<string> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (language, { eq }) => eq(language.code, code),
      });

    if (!language) {
      throw new NotFoundError('Language');
    }

    // Create temp folder
    const tempNameFolder = `${code}-download--${generateRandomString(5)}-${currentUnixDate()}`;
    const pathTemp = join(
      ABSOLUTE_PATHS_BACKEND.uploads.temp,
      'langs',
      tempNameFolder,
    );
    if (!fs.existsSync(pathTemp)) {
      fs.mkdirSync(pathTemp, { recursive: true });
    }

    const plugins = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (plugin, { desc }) => desc(plugin.updated),
      columns: {
        code: true,
      },
    });

    [...plugins, { code: 'admin' }, { code: 'core' }].forEach(plugin => {
      const path = join(
        ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin.code }).frontend.language,
        `${code}.json`,
      );
      if (
        !fs.existsSync(path) ||
        (pluginsToInclude.length > 0 && !pluginsToInclude.includes(plugin.code))
      ) {
        return;
      }

      copyFile(path, join(pathTemp, `${plugin.code}.json`));
    });

    const name = removeSpecialCharacters(
      `${language.code}--${userId}-${generateRandomString(5)}-${currentUnixDate()}`,
    );

    // Create tgz
    try {
      await tar.create(
        {
          gzip: true,
          file: join(ABSOLUTE_PATHS_BACKEND.uploads.temp, `${name}.tgz`),
          cwd: pathTemp,
        },
        ['.'],
      );

      // Remove temp folder
      fs.rmSync(pathTemp, { recursive: true });
    } catch (error) {
      throw new CustomError({
        code: 'LANGUAGE_DOWNLOAD_ERROR',
        message: 'Error creating tgz',
      });
    }

    return `${name}.tgz`;
  }
}
