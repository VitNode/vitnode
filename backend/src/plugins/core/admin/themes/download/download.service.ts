import * as fs from "fs";
import { writeFile } from "fs/promises";
import { join } from "path";

import * as tar from "tar";
import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import {
  currentUnixDate,
  generateRandomString,
  removeSpecialCharacters
} from "@vitnode/shared";
import { NotFoundError, CustomError, User } from "@vitnode/backend";

import { DownloadAdminThemesArgs } from "./dto/download.args";

import { core_themes } from "../../database/schema/themes";
import { DatabaseService } from "@/database/database.service";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DownloadAdminThemesService {
  constructor(private readonly databaseService: DatabaseService) {}

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

    const path = ABSOLUTE_PATHS.frontend.theme({ theme_id: theme.id }).root;
    // Check if theme exists
    if (!fs.existsSync(path)) {
      throw new NotFoundError("Theme directory");
    }

    const name = removeSpecialCharacters(
      `${theme.name}-${
        version && version_code ? version_code : theme.version_code
      }--${userId}-${generateRandomString(5)}-${currentUnixDate()}`
    );

    // Update version
    if (
      version !== null &&
      version_code !== null &&
      version_code > theme.version_code &&
      id !== 1
    ) {
      const pathThemeConfig = `${path}/config.json`;
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
      tar.create(
        {
          gzip: true,
          file: join(ABSOLUTE_PATHS.uploads.temp, `${name}.tgz`),
          cwd: path
        },
        ["."]
      );
    } catch (error) {
      throw new CustomError({
        code: "DOWNLOAD_ADMIN_THEMES_SERVICE_ERROR",
        message: "Error creating tgz"
      });
    }

    return `${name}.tgz`;
  }
}
