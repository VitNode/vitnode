import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync,
} from "fs";
import { join } from "path";

import sharp from "sharp";
import { Injectable } from "@nestjs/common";
import { generateRandomString, removeSpecialCharacters } from "@vitnode/shared";

import { UploadCoreFilesArgs } from "./dto/upload.args";
import { UploadCoreFilesObj } from "./dto/upload.obj";
import { HelpersUploadCoreFilesService, acceptMimeTypeImage } from "./helpers";

import { DatabaseService } from "../../../../database";
import { CustomError } from "../../../../errors";
import { ABSOLUTE_PATHS_BACKEND } from "../../../..";

@Injectable()
export class UploadCoreFilesService extends HelpersUploadCoreFilesService {
  constructor(private readonly databaseService: DatabaseService) {
    super();
  }

  async upload({
    acceptMimeType,
    files,
    folder,
    maxUploadSizeBytes,
    plugin,
    secure = false,
  }: UploadCoreFilesArgs): Promise<UploadCoreFilesObj[]> {
    // Check if plugin exists
    const pluginExists =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, plugin),
        columns: {
          code: true,
        },
      });

    if (!pluginExists && plugin !== "core") {
      throw new CustomError({
        code: "PLUGIN_NOT_FOUND",
        message: `Plugin "${plugin}" not found`,
      });
    }

    // Validate files
    await Promise.all(
      files.map(async file => {
        await this.checkAcceptMimeType({ file, acceptMimeType });
        await this.checkSizeFile({ file, maxUploadSizeBytes });
      }),
    );

    // Create folders
    const date = new Date();
    const dir = join(
      "uploads",
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

    return Promise.all(
      files.map(async file => {
        const { createReadStream, filename, mimetype } = await file;
        const extension = filename.split(".").pop();
        const name = filename.split(".").shift();
        const stream = createReadStream();

        // Generate file name
        const currentFileName = `${date.getTime()}_${generateRandomString(
          10,
        )}_${removeSpecialCharacters(name)}.${extension}`;
        const url = join(dirFolder, currentFileName);

        // Save file to file system
        await new Promise((resolve, reject) =>
          stream
            .pipe(createWriteStream(url))
            .on("finish", () => resolve(url))
            .on("error", reject),
        );

        // Get file stats
        const stat = statSync(url);

        if (acceptMimeTypeImage.includes(mimetype)) {
          const file = readFileSync(url);

          const image = sharp(file);
          const metadata = await image.metadata();

          return {
            plugin,
            mimetype,
            file_name: currentFileName,
            file_name_original: filename,
            dir_folder: dir,
            extension,
            file_size: stat.size,
            width: metadata.width,
            height: metadata.height,
          };
        }

        return {
          plugin,
          mimetype,
          file_name: currentFileName,
          file_name_original: filename,
          dir_folder: dir,
          extension,
          file_size: stat.size,
        };
      }),
    );
  }
}
