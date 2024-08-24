import { CustomError } from '@/errors';
import { FileUpload } from '@/graphql-upload';

export const acceptMimeTypeImage = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
];

export const acceptMimeTypeVideo = ['video/mp4', 'video/webm', 'video/ogg'];

export class HelpersUploadCoreFilesService {
  protected async checkAcceptMimeType({
    acceptMimeType,
    disableThrowError,
    file,
  }: {
    acceptMimeType: string[];
    disableThrowError?: boolean;
    file: Promise<FileUpload>;
  }): Promise<boolean> {
    const { filename, mimetype } = await file;
    if (acceptMimeType.length === 0) {
      return true;
    }

    if (!acceptMimeType.includes(mimetype) && !disableThrowError) {
      throw new CustomError({
        code: 'INVALID_TYPE_FILE',
        message: `${filename} file has invalid type! We only accept the following types: ${acceptMimeType.join(
          ', ',
        )}.`,
      });
    }

    return acceptMimeType.includes(mimetype);
  }

  protected async checkSizeFile({
    file,
    maxUploadSizeBytes,
  }: {
    file: Promise<FileUpload>;
    maxUploadSizeBytes: number;
  }): Promise<number> {
    const { createReadStream, filename } = await file;
    const stream = createReadStream();
    const chunks = [];

    // Read the file data and calculate its size
    for await (const chunk of stream) {
      // Typescript does not allow to push a Buffer into an array of unknown type
      chunks.push(chunk as never);
    }

    const fileSizeInBytes = Buffer.concat(chunks).length;

    if (fileSizeInBytes > maxUploadSizeBytes) {
      throw new CustomError({
        code: 'FILE_TOO_LARGE',
        message: `${filename} file is too large! We only accept files up to ${maxUploadSizeBytes} bytes.`,
      });
    }

    stream.destroy();

    return fileSizeInBytes;
  }
}
