import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  statSync
} from "fs";
import { join } from "path";

import * as sharp from "sharp";
import { Injectable } from "@nestjs/common";

import { UploadCoreFilesArgs } from "./dto/upload.args";
import { UploadCoreFilesObj } from "./dto/upload.obj";
import { HelpersUploadCoreFilesService } from "./helpers";

import { generateRandomString } from "@/functions/generate-random-string";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { DatabaseService } from "@/plugins/database/database.service";
import { CustomError } from "@/utils/errors/CustomError";
import { acceptMimeTypeImage } from "@/plugins/core/editor/helpers";

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
    secure = false
  }: UploadCoreFilesArgs): Promise<UploadCoreFilesObj[]> {
    // Check if plugin exists
    const pluginExists =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, plugin),
        columns: {
          code: true
        }
      });

    if (!pluginExists && plugin !== "core") {
      throw new CustomError({
        code: "PLUGIN_NOT_FOUND",
        message: `Plugin "${plugin}" not found`
      });
    }

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
      plugin,
      folder
    );
    const dirFolder = secure
      ? join(process.cwd(), dir) // Save files in the backend folder
      : join(process.cwd(), "..", "frontend", "public", dir); // Save files in the frontend folder
    if (!existsSync(dirFolder)) {
      mkdirSync(dirFolder, { recursive: true });
    }

    return await Promise.all(
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

        if (acceptMimeTypeImage.includes(mimetype)) {
          const file = readFileSync(url);

          const image = sharp(file);
          const metadata = await image.metadata();

          return {
            plugin,
            mimetype,
            file_name: currentFileName,
            dir_folder: dir,
            extension,
            file_size: stat.size,
            width: metadata.width,
            height: metadata.height
          };
        }

        return {
          plugin,
          mimetype,
          file_name: currentFileName,
          dir_folder: dir,
          extension,
          file_size: stat.size
        };
      })
    );
  }
}
