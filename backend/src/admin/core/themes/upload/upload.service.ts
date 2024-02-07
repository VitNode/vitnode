import * as fs from "fs";
import { join } from "path";
import { writeFile } from "fs/promises";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { UploadAdminThemesArgs } from "./dto/delete.args";
import { ConfigTheme } from "../themes.module";

import { DatabaseService } from "@/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { core_themes } from "../../database/schema/themes";

@Injectable()
export class UploadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  protected path: string = join("..", "frontend", "themes");
  protected tempFolder: string = `temp--${generateRandomString(5)}-${currentDate()}`;
  protected tempPath: string = `${this.path}/${this.tempFolder}`;

  protected getThemeConfig(): ConfigTheme {
    const pathThemeJSON = join(this.tempPath, "theme.json");
    const themeFile = fs.readFileSync(pathThemeJSON, "utf8");
    const config: ConfigTheme = JSON.parse(themeFile);

    // Check if variables exists
    if (!config.name || !config.author || !config.author_url) {
      throw new CustomError({
        code: "THEME_CONFIG_VARIABLES_NOT_FOUND",
        message: "Theme config variables not found"
      });
    }

    if (!config.version || !config.version_code) {
      throw new CustomError({
        code: "THEME_CONFIG_VERSION_NOT_FOUND",
        message: "Theme config version not found"
      });
    }

    return config;
  }

  async upload({ file }: UploadAdminThemesArgs): Promise<string> {
    const tgz = await file;

    // Unpack theme to temp folder
    fs.mkdirSync(this.tempPath);
    tgz
      .createReadStream()
      .pipe(
        tar.x({
          cwd: this.tempPath
        })
      )
      .on("finish", async () => {
        const config = this.getThemeConfig();

        // Create theme in database
        const theme = await this.databaseService.db
          .insert(core_themes)
          .values({
            name: config.name,
            version: config.version,
            version_code: config.version_code,
            created: currentDate(),
            author: config.author,
            author_url: config.author_url
          })
          .returning();

        // Update theme folder name
        const newPath = `${this.path}/${theme[0].id}`;
        fs.renameSync(this.tempPath, newPath);

        // Update the global.scss file
        const pathSCSSFile = `${newPath}/core/layout/global.scss`;
        const pathSCSSFileContent = fs.readFileSync(pathSCSSFile, "utf8");
        await writeFile(
          pathSCSSFile,
          pathSCSSFileContent.replace(/\.theme_\d+/g, `.theme_${theme[0].id}`)
        );
      });

    return "upload";
  }
}
