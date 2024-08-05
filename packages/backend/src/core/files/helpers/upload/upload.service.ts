import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
  unlink,
} from 'fs';
import { join } from 'path';

import sharp from 'sharp';
import { Injectable } from '@nestjs/common';

import { UploadCoreFilesArgs } from './dto/upload.args';
import { UploadCoreFilesObj } from './dto/upload.obj';
import { HelpersUploadCoreFilesService, acceptMimeTypeImage } from './helpers';
import { DeleteCoreFilesArgs } from './dto/delete.args';

import { DatabaseService } from '@/utils/database/database.service';
import { CustomError, InternalServerError } from '@/errors';
import { ABSOLUTE_PATHS_BACKEND, removeSpecialCharacters } from '../../../..';
import { generateRandomString } from '@/functions/generate-random-string';

@Injectable()
export class FilesService extends HelpersUploadCoreFilesService {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  async upload({
    acceptMimeType,
    file,
    folder,
    maxUploadSizeBytes,
    plugin,
    secure = false,
  }: UploadCoreFilesArgs): Promise<UploadCoreFilesObj> {
    // Check if plugin exists
    const pluginExists =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, plugin),
        columns: {
          code: true,
        },
      });

    if (!pluginExists && plugin !== 'core') {
      throw new CustomError({
        code: 'PLUGIN_NOT_FOUND',
        message: `Plugin "${plugin}" not found`,
      });
    }

    // Validate files
    await Promise.all([
      this.checkAcceptMimeType({ file, acceptMimeType }),
      this.checkSizeFile({ file, maxUploadSizeBytes }),
    ]);

    // Create folders
    const date = new Date();
    const dir = join(
      'uploads',
      `monthly_${date.getMonth() + 1}_${date.getFullYear()}`,
      plugin,
      folder,
    );
    const dirFolder = secure
      ? join(ABSOLUTE_PATHS_BACKEND.uploads.private, dir)
      : join(ABSOLUTE_PATHS_BACKEND.uploads.public, dir);
    if (!existsSync(dirFolder)) {
      mkdirSync(dirFolder, { recursive: true });
    }

    const { createReadStream, filename, mimetype } = await file;
    const extension = filename.split('.').pop();
    const name = filename.split('.').shift();
    const stream = createReadStream();

    if (!extension || !name) {
      throw new InternalServerError();
    }

    // Generate file name
    const currentFileName = `${date.getTime()}_${generateRandomString(
      10,
    )}_${removeSpecialCharacters(name)}.${extension}`;
    const url = join(dirFolder, currentFileName);

    // Save file to file system
    await new Promise((resolve, reject) =>
      stream
        .pipe(createWriteStream(url))
        .on('finish', () => resolve(url))
        .on('error', reject),
    );

    // Get file stats
    const stat = statSync(url);

    if (acceptMimeTypeImage.includes(mimetype)) {
      const file = readFileSync(url);

      const image = sharp(file);
      const metadata = await image.metadata();

      return {
        mimetype,
        file_name: currentFileName,
        file_name_original: filename,
        dir_folder: dir,
        extension,
        file_size: stat.size,
        width: metadata.width ?? null,
        height: metadata.height ?? null,
      };
    }

    return {
      mimetype,
      file_name: currentFileName,
      file_name_original: filename,
      dir_folder: dir,
      extension,
      file_size: stat.size,
      width: null,
      height: null,
    };
  }

  checkIfFileExistsAndReturnPath({
    dir_folder,
    file_name,
    secure,
  }: DeleteCoreFilesArgs) {
    const path = secure
      ? ABSOLUTE_PATHS_BACKEND.uploads.private
      : ABSOLUTE_PATHS_BACKEND.uploads.public;

    const filePath = join(path, dir_folder, file_name);

    // Check if file exists
    if (!existsSync(filePath)) {
      throw new CustomError({
        code: 'FILE_NOT_FOUND',
        message: `File "${filePath}" not found`,
      });
    }

    return filePath;
  }

  delete({ dir_folder, file_name, secure }: DeleteCoreFilesArgs) {
    const path = this.checkIfFileExistsAndReturnPath({
      dir_folder,
      file_name,
      secure,
    });

    // Remove file from server
    unlink(path, err => {
      // eslint-disable-next-line no-console
      if (err) console.error(err);
    });

    return 'Success!';
  }
}
