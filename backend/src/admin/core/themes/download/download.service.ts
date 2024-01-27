import * as fs from 'fs';
import { join } from 'path';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';

import { DownloadAdminThemesArgs } from './dto/download.args';

import { DatabaseService } from '@/database/database.service';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { removeSpecialCharacters } from '@/functions/remove-special-characters';
import { User } from '@/utils/decorators/user.decorator';
import { generateRandomString } from '@/functions/generate-random-string';
import { currentDate } from '@/functions/date';

@Injectable()
export class DownloadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async download({ id: userId }: User, { id }: DownloadAdminThemesArgs): Promise<string> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (theme, { eq }) => eq(theme.id, id)
    });

    if (!theme) {
      throw new NotFoundError('Theme');
    }

    const name = removeSpecialCharacters(
      `${theme.name}-${theme.version}--${userId}-${generateRandomString(5)}-${currentDate()}`
    );

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

      getFiles(join('..', 'frontend', 'themes', theme.id.toString()));
      archive.finalize();
    });

    return `Success! - ${name}`;
  }
}
