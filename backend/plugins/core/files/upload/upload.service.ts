import { createWriteStream, existsSync, mkdirSync, statSync } from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { UploadCoreFilesArgs } from "./dto/upload.args";
import { UploadCoreFilesObj } from "./dto/upload.obj";
import { HelpersUploadCoreFilesService } from "./helpers";

import { generateRandomString } from "@/functions/generate-random-string";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";

@Injectable()
export class UploadCoreFilesService extends HelpersUploadCoreFilesService {
  async upload({
    acceptMimeType,
    files,
    maxUploadSizeBytes,
    plugin
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
    const dir = join(
      "uploads",
      `monthly_${date.getMonth() + 1}_${date.getFullYear()}`,
      plugin
    );
    const dirFolder = join(process.cwd(), "..", "frontend", "public", dir);
    if (!existsSync(dirFolder)) {
      mkdirSync(dirFolder, { recursive: true });
    }

    const saveFiles = await Promise.all(
      files.map(async file => {
        const { createReadStream, filename, mimetype } = await file;
        const extension = filename.split(".").pop();
        const name = filename.split(".").shift();

        const stream = createReadStream();

        // Generate file name
        const currentFileName = `${date.getTime()}_${generateRandomString(
          10
        )}_${removeSpecialCharacters(name)}.${extension}`;
        const url = join(dirFolder, currentFileName);

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
          plugin,
          mimetype,
          name: currentFileName,
          dir_folder: dir,
          extension,
          size: stat.size
        };
      })
    );

    return saveFiles;
  }
}
