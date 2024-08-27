import { core_languages } from '@/database/schema/languages';
import { NotFoundError } from '@/errors';
import { generateRandomString } from '@/functions/generate-random-string';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import * as fs from 'fs';
import { join } from 'path';
import * as tar from 'tar';

import { ABSOLUTE_PATHS_BACKEND, currentUnixDate } from '../../../..';
import { UpdateCoreAdminLanguagesArgs } from './dto/update.args';

@Injectable()
export class UpdateAdminCoreLanguageService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async update({ code, file }: UpdateCoreAdminLanguagesArgs): Promise<string> {
    const lang = await this.databaseService.db.query.core_languages.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!lang) {
      throw new NotFoundError('Language');
    }

    // Unpack the file to the temp folder
    const tgz = await file;
    const tempNameFolder = `${code}-update--${generateRandomString(5)}-${currentUnixDate()}`;
    const pathTemp = join(
      ABSOLUTE_PATHS_BACKEND.uploads.temp,
      'langs',
      tempNameFolder,
    );
    if (!fs.existsSync(pathTemp)) {
      fs.mkdirSync(pathTemp, { recursive: true });
    }

    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(tar.extract({ C: pathTemp, strip: 1 }))
        .on('error', function (err) {
          throw new reject(err.message);
        })
        .on('finish', function () {
          const plugins = fs
            .readdirSync(pathTemp)
            .map(fileName => fileName.replace('.json', ''));

          plugins.forEach(plugin => {
            // Check if the plugin exists
            const path = ABSOLUTE_PATHS_BACKEND.plugin({ code: plugin })
              .frontend.language;

            if (!fs.existsSync(path)) {
              return;
            }

            // Copy the file to the plugin folder
            fs.copyFileSync(
              join(pathTemp, `${plugin}.json`),
              join(path, `${code}.json`),
            );
          });

          // Remove the temp folder
          fs.rmdirSync(pathTemp, { recursive: true });

          resolve('success');
        });
    });

    await this.databaseService.db
      .update(core_languages)
      .set({ updated: new Date() })
      .where(eq(core_languages.code, code));

    return 'Success!';
  }
}
