import { createWriteStream, existsSync, mkdirSync, statSync } from 'fs';

import { Injectable } from '@nestjs/common';

import { FilesObj, UploadCoreAttachmentsArgs } from './dto/upload-core_attachments.args';
import { UploadCoreAttachmentsObj } from './dto/upload-core_attachments.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';
import { removeSpecialCharacters } from '@/functions/remove-special-characters';
import { generateRandomString } from '@/functions/generate-random-string';
import { currentDate } from '@/functions/date';

@Injectable()
export class UploadCoreAttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  protected async checkSizeFile({
    file: { file },
    maxUploadSizeBytes
  }: {
    file: FilesObj;
    maxUploadSizeBytes: number;
  }) {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    const chunks = [];

    // Read the file data and calculate its size
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const fileSizeInBytes = Buffer.concat(chunks).length;

    if (fileSizeInBytes > maxUploadSizeBytes) {
      throw new CustomError({
        code: 'FILE_TOO_LARGE',
        message: `${filename} file is too large! We only accept files up to ${maxUploadSizeBytes} bytes.`
      });
    }

    stream.destroy();

    return fileSizeInBytes;
  }

  protected async checkAcceptMimeType({
    acceptMimeType,
    file: { file }
  }: {
    acceptMimeType: string[];
    file: FilesObj;
  }) {
    if (acceptMimeType.length <= 0) return;

    const { filename, mimetype } = await file;

    if (!acceptMimeType.includes(mimetype)) {
      throw new CustomError({
        code: 'INVALID_TYPE_FILE',
        message: `${filename} file has invalid type! We only accept the following types: ${acceptMimeType.join(
          ', '
        )}.`
      });
    }
  }

  async upload({
    acceptMimeType,
    files,
    maxUploadSizeBytes,
    module,
    module_id
  }: UploadCoreAttachmentsArgs): Promise<UploadCoreAttachmentsObj[]> {
    // Validate files
    await Promise.all(
      files.map(async file => {
        await this.checkAcceptMimeType({ file, acceptMimeType });
        await this.checkSizeFile({ file, maxUploadSizeBytes });
      })
    );

    // Create folders
    const date = new Date();
    const dir = `public/monthly_${date.getMonth() + 1}_${date.getFullYear()}/${module}`;
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }

    // Upload files
    return await Promise.all(
      files.map(async ({ description, file, position }) => {
        const { createReadStream, filename, mimetype } = await file;

        const stream = createReadStream();

        // Generate file name
        const currentFileName = `${date.getTime()}_${generateRandomString(
          10
        )}_${removeSpecialCharacters(filename)}`;
        const path = `${dir}/${currentFileName}`;

        // Save file to file system
        await new Promise((resolve, reject) =>
          stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve(path))
            .on('error', reject)
        );

        // Get file stats
        const stat = statSync(path);

        // Save file to database
        return await this.prisma.core_attachments.create({
          data: {
            module,
            module_id,
            name: currentFileName,
            mimetype,
            path,
            created: currentDate(),
            position,
            description,
            extension: filename.split('.').pop(),
            file_size: stat.size,
            member_id: module_id
          }
        });
      })
    );
  }
}
