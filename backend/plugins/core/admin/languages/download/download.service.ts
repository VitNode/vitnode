import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { DownloadCoreAdminLanguagesArgs } from "./dto/download.args";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { DatabaseService } from "@/plugins/database/database.service";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { User } from "@/utils/decorators/user.decorator";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class DownloadAdminCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async download(
    { id: userId }: User,
    { all, code, plugins }: DownloadCoreAdminLanguagesArgs
  ): Promise<string> {
    const language =
      await this.databaseService.db.query.core_languages.findFirst({
        where: (language, { eq }) => eq(language.code, code)
      });

    if (!language) {
      throw new NotFoundError("Language");
    }

    const path = join("..", "frontend", "langs", code);
    // Check if language exists
    if (!fs.existsSync(path)) {
      throw new NotFoundError("Language directory");
    }

    const name = removeSpecialCharacters(
      `${language.code}--${userId}-${generateRandomString(5)}-${currentDate()}`
    );

    const pluginsPath: string[] = [];
    if (plugins.length > 0 && !all) {
      plugins.forEach((plugin) => {
        const name = `${plugin}.json`;
        const pluginPath = join(path, name);
        if (!fs.existsSync(pluginPath)) {
          return;
        }

        pluginsPath.push(name);
      });
    }

    // Create tgz
    try {
      tar.c(
        { gzip: true, file: `temp/${name}.tgz`, cwd: path },
        all ? ["."] : pluginsPath
      );
    } catch (error) {
      throw new CustomError({
        code: "LANGUAGE_DOWNLOAD_ERROR",
        message: "Error creating tgz"
      });
    }

    return `${name}.tgz`;
  }
}
