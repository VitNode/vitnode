import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload-minimal';

import { UploadCoreAttachmentsArgs } from './dto/upload-core_attachments.args';

import { PrismaService } from '@/src/prisma/prisma.service';
import { CustomError } from '@/utils/errors/CustomError';

@Injectable()
export class UploadCoreAttachmentsService {
  constructor(private readonly prisma: PrismaService) {}

  protected async checkSizeFile({
    files,
    maxUploadSizeBytes
  }: {
    files: Promise<FileUpload>[];
    maxUploadSizeBytes: number;
  }) {
    return await Promise.all(
      files.map(async file => {
        const { createReadStream, filename } = await file;
        const stream = createReadStream();
        const chunks = [];

        // Read the file data and calculate its size
        for await (const chunk of stream) {
          chunks.push(chunk);
        }

        const size = Buffer.concat(chunks).length;

        if (size > maxUploadSizeBytes) {
          throw new Error(
            `${filename} file size is too large! Accepted size is ${maxUploadSizeBytes} bytes, but ${size} bytes given.`
          );
        }

        return size;
      })
    );
  }

  protected async checkAcceptMimeType({
    acceptMimeType,
    files
  }: {
    acceptMimeType: string[];
    files: Promise<FileUpload>[];
  }) {
    if (acceptMimeType.length <= 0) return;

    await Promise.all(
      files.map(async file => {
        const { mimetype } = await file;

        if (!acceptMimeType.includes(mimetype)) {
          throw new CustomError({
            code: 'INVALID_TYPE_FILE',
            message: `Invalid file type! We only accept the following types: ${acceptMimeType.join(
              ', '
            )}.`
          });
        }
      })
    );
  }

  async upload({
    acceptMimeType,
    files,
    maxUploadSizeBytes,
    module,
    module_id
  }: UploadCoreAttachmentsArgs) {
    await this.checkAcceptMimeType({ files, acceptMimeType });
    await this.checkSizeFile({ files, maxUploadSizeBytes });

    // TODO: Upload to S3

    // TODO: Save to database

    return 'UploadCoreAttachmentsService';
  }
}
