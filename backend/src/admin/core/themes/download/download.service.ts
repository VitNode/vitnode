import * as fs from 'fs';
import { join } from 'path';
import { writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import { eq } from 'drizzle-orm';

import { DownloadAdminThemesArgs } from './dto/download.args';

import { DatabaseService } from '@/database/database.service';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { removeSpecialCharacters } from '@/functions/remove-special-characters';
import { User } from '@/utils/decorators/user.decorator';
import { generateRandomString } from '@/functions/generate-random-string';
import { currentDate } from '@/functions/date';
import { core_themes } from '../../database/schema/themes';

@Injectable()
export class DownloadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async download(
    { id: userId }: User,
    { id, version, version_code }: DownloadAdminThemesArgs
  ): Promise<string> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (theme, { eq }) => eq(theme.id, id)
    });

    if (!theme) {
      throw new NotFoundError('Theme');
    }

    const path = join('..', 'frontend', 'themes', theme.id.toString());
    const name = removeSpecialCharacters(
      `${theme.name}-${
        version && version_code ? version : theme.version
      }--${userId}-${generateRandomString(5)}-${currentDate()}`
    );

    // Update version
    if (version && version_code && version_code > theme.version_code) {
      const pathThemeConfig = `${path}/theme.json`;
      const getInfoJson = fs.readFileSync(pathThemeConfig, 'utf8');
      const infoJson: { name: string } = JSON.parse(getInfoJson);

      await writeFile(
        pathThemeConfig,
        JSON.stringify({ ...infoJson, version, version_code }, null, 2)
      );

      await this.databaseService.db
        .update(core_themes)
        .set({
          version,
          version_code
        })
        .where(eq(core_themes.id, id));
    }

    // Prepare to zip
    const output = `temp/${name}.zip`;
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });
    const stream = fs.createWriteStream(output);

    // Create zip
    new Promise<void>((resolve, reject) => {
      archive.on('error', err => reject(err)).pipe(stream);
      stream.on('close', () => resolve());
      stream.on('end', () => resolve());
      stream.on('error', err => reject(err));

      // Recursive function to get all files in a directory
      const getFiles = (dirPath: string) => {
        fs.readdirSync(dirPath).forEach(file => {
          const fullPath = join(dirPath, file);

          if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
          } else {
            archive.file(fullPath, { name: fullPath.replace('../frontend/themes/', '') });
          }
        });
      };

      getFiles(path);
      archive.finalize();
    });

    return `${name}.zip`;
  }
}
