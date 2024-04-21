import { FileUpload } from "@/utils/graphql-upload/Upload";
import { CustomError } from "@/utils/errors/CustomError";

export class HelpersUploadCoreFilesService {
  protected async checkSizeFile({
    file,
    maxUploadSizeBytes
  }: {
    file: Promise<FileUpload>;
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
        code: "FILE_TOO_LARGE",
        message: `${filename} file is too large! We only accept files up to ${maxUploadSizeBytes} bytes.`
      });
    }

    stream.destroy();

    return fileSizeInBytes;
  }

  protected async checkAcceptMimeType({
    acceptMimeType,
    file
  }: {
    acceptMimeType: string[];
    file: Promise<FileUpload>;
  }) {
    if (acceptMimeType.length === 0) return;

    const { filename, mimetype } = await file;

    if (!acceptMimeType.includes(mimetype)) {
      throw new CustomError({
        code: "INVALID_TYPE_FILE",
        message: `${filename} file has invalid type! We only accept the following types: ${acceptMimeType.join(
          ", "
        )}.`
      });
    }
  }
}
