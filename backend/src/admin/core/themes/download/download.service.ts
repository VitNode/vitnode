import * as fs from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";

import * as tar from "tar";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DownloadAdminThemesArgs } from "./dto/download.args";

import { DatabaseService } from "@/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { User } from "@/utils/decorators/user.decorator";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { core_themes } from "../../database/schema/themes";
import { CustomError } from "@/utils/errors/CustomError";

@Injectable()
export class DownloadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async download(
    { id: userId }: User,
    { id, version, version_code }: DownloadAdminThemesArgs
  ): Promise<string> {
    const theme = await this.databaseService.db.query.core_themes.findFirst({
      where: (theme, { eq }) => eq(theme.id, id)
    });

    if (!theme) {
      throw new NotFoundError("Theme");
    }

    const path = join("..", "frontend", "themes", theme.id.toString());
    // Check if theme exists
    if (!fs.existsSync(path)) {
      throw new NotFoundError("Theme directory");
    }

    const name = removeSpecialCharacters(
      `${theme.name}-${
        version && version_code ? version : theme.version
      }--${userId}-${generateRandomString(5)}-${currentDate()}`
    );

    // Update version
    if (
      version !== null &&
      version_code !== null &&
      version_code > theme.version_code &&
      id !== 1
    ) {
      const pathThemeConfig = `${path}/theme.json`;
      const getInfoJson = fs.readFileSync(pathThemeConfig, "utf8");
      const infoJson: { name: string } = JSON.parse(getInfoJson);

      await writeFile(
        pathThemeConfig,
        JSON.stringify({ ...infoJson, version, version_code }, null, 2)
      );

      await this.databaseService.db
        .update(core_themes)
        .set({
          version,
          version_code
        })
        .where(eq(core_themes.id, id));
    }

    // Create tgz
    try {
      tar.c({ gzip: true, file: `temp/${name}.tgz`, cwd: path }, ["."]);
    } catch (error) {
      throw new CustomError({
        code: "DOWNLOAD_ADMIN_THEMES_SERVICE_ERROR",
        message: "Error creating tgz"
      });
    }

    return `${name}.tgz`;
  }
}
