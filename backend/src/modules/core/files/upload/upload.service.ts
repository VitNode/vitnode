import { createWriteStream, existsSync, mkdirSync, statSync } from "fs";

import { Injectable } from "@nestjs/common";

import { UploadCoreFilesArgs } from "./dto/upload.args";
import { UploadCoreFilesObj } from "./dto/upload.obj";

import { CustomError } from "@/src/utils/errors/CustomError";
import { FileUpload } from "@/src/utils/graphql-upload/Upload";
import { generateRandomString } from "@/src/functions/generate-random-string";
import { removeSpecialCharacters } from "@/src/functions/remove-special-characters";

@Injectable()
export class UploadCoreFilesService {
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

  async upload({
    acceptMimeType,
    files,
    maxUploadSizeBytes,
    module_name
  }: UploadCoreFilesArgs): Promise<UploadCoreFilesObj[]> {
    // Validate files
    await Promise.all(
      files.map(async file => {
        await this.checkAcceptMimeType({ file, acceptMimeType });
        await this.checkSizeFile({ file, maxUploadSizeBytes });
      })
    );

    // Create folders
    const date = new Date();
    const dirFolder = `public/monthly_${date.getMonth() + 1}_${date.getFullYear()}/${module_name}`;
    if (!existsSync(dirFolder)) {
      mkdirSync(dirFolder, { recursive: true });
    }

    const saveFiles = await Promise.all(
      files.map(async file => {
        const { createReadStream, filename, mimetype } = await file;

        const stream = createReadStream();

        // Generate file name
        const currentFileName = `${date.getTime()}_${generateRandomString(
          10
        )}_${removeSpecialCharacters(filename)}`;
        const url = `${dirFolder}/${currentFileName}`;

        // Save file to file system
        await new Promise((resolve, reject) =>
          stream
            .pipe(createWriteStream(url))
            .on("finish", () => resolve(url))
            .on("error", reject)
        );

        // Get file stats
        const stat = statSync(url);

        return {
          module_name,
          mimetype,
          name: currentFileName,
          dir_folder: dirFolder,
          extension: filename.split(".").pop(),
          size: stat.size
        };
      })
    );

    return saveFiles;
  }
}
