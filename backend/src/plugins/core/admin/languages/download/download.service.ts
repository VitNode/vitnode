import { join } from "path";
import * as fs from "fs";
import { copyFile } from "fs/promises";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import {
  currentUnixDate,
  generateRandomString,
  removeSpecialCharacters
} from "@vitnode/shared";

import { DownloadCoreAdminLanguagesArgs } from "./dto/download.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DownloadAdminCoreLanguageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async download(
    { id: userId }: User,
    { code, plugins: pluginsToInclude }: DownloadCoreAdminLanguagesArgs
  ): Promise<string> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (language, { eq }) => eq(language.code, code)
      });

    if (!language) {
      throw new NotFoundError("Language");
    }

    // Create temp folder
    const tempNameFolder = `${code}-download--${generateRandomString(5)}-${currentUnixDate()}`;
    const pathTemp = join(ABSOLUTE_PATHS.uploads.temp, "langs", tempNameFolder);
    if (!fs.existsSync(pathTemp)) {
      fs.mkdirSync(pathTemp, { recursive: true });
    }

    const plugins = await this.databaseService.db.query.core_plugins.findMany({
      orderBy: (plugin, { desc }) => desc(plugin.updated),
      columns: {
        code: true
      }
    });

    [...plugins, { code: "admin" }, { code: "core" }].forEach(plugin => {
      const path = join(
        ABSOLUTE_PATHS.plugin({ code: plugin.code }).frontend.language,
        `${code}.json`
      );
      if (
        !fs.existsSync(path) ||
        (pluginsToInclude.length > 0 && !pluginsToInclude.includes(plugin.code))
      ) {
        return;
      }

      copyFile(path, join(pathTemp, `${plugin.code}.json`));
    });

    const name = removeSpecialCharacters(
      `${language.code}--${userId}-${generateRandomString(5)}-${currentUnixDate()}`
    );

    // Create tgz
    try {
      await tar.create(
        {
          gzip: true,
          file: join(ABSOLUTE_PATHS.uploads.temp, `${name}.tgz`),
          cwd: pathTemp
        },
        ["."]
      );

      // Remove temp folder
      fs.rmSync(pathTemp, { recursive: true });
    } catch (error) {
      throw new CustomError({
        code: "LANGUAGE_DOWNLOAD_ERROR",
        message: "Error creating tgz"
      });
    }

    return `${name}.tgz`;
  }
}
