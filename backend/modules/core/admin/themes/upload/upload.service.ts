import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { UploadAdminThemesArgs } from "./dto/upload.args";
import { ConfigTheme } from "../themes.module";
import { ShowAdminThemes } from "../show/dto/show.obj";

import { DatabaseService } from "@/modules/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { core_themes } from "../../database/schema/themes";
import { FileUpload } from "@/utils/graphql-upload/Upload";
import { NotFoundError } from "@/utils/errors/not-found-error";

@Injectable()
export class UploadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  protected path: string = join(process.cwd(), "..", "frontend", "themes");
  protected tempFolderName: string = `${generateRandomString(5)}${currentDate()}`;
  protected tempPath: string = join(process.cwd(), "temp", "themes");

  protected async getThemeConfig({
    tgz
  }: {
    tgz: FileUpload;
  }): Promise<ConfigTheme> {
    // Create folders
    const path = join(this.tempPath, this.tempFolderName);
    await fs.promises.mkdir(path, { recursive: true });

    // Upload to temp folder
    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          tar.x({
            cwd: path
          })
        )
        .on("error", err => {
          reject(err.message);
        })
        .on("finish", () => {
          resolve("success");
        });
    });

    const pathThemeJSON = join(path, "theme.json");
    const themeFile = await fs.promises.readFile(pathThemeJSON, "utf8");
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

    // Delete temp folder
    await fs.promises.rm(path, { recursive: true });

    return config;
  }

  async upload({ file, id }: UploadAdminThemesArgs): Promise<ShowAdminThemes> {
    if (id) {
      const theme = await this.databaseService.db.query.core_themes.findFirst({
        where: (table, { eq }) => eq(table.id, id)
      });

      if (!theme) {
        throw new NotFoundError("Theme");
      }

      if (theme.protected) {
        throw new CustomError({
          code: "THEME_PROTECTED",
          message: "Theme is protected and cannot be updated"
        });
      }
    }

    const tgz = await file;
    const config = await this.getThemeConfig({ tgz });

    // Save theme to database
    const themes = await this.databaseService.db
      .insert(core_themes)
      .values({
        name: config.name,
        version: config.version,
        version_code: config.version_code,
        created: currentDate(),
        author: config.author,
        author_url: config.author_url,
        support_url: config.support_url
      })
      .returning();

    const theme = themes[0];

    // Create theme folder in frontend
    const newPath = join(this.path, `${theme.id}`);
    await fs.promises.mkdir(newPath);

    // Unpack theme to temp folder
    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          tar.x({
            cwd: newPath
          })
        )
        .on("error", err => {
          reject(err.message);
        })
        .on("finish", async () => {
          // Update the global.scss file
          try {
            const pathSCSSFile = join(newPath, "core", "layout", "global.scss");
            const pathSCSSFileContent = await fs.promises.readFile(
              pathSCSSFile,
              "utf8"
            );
            await fs.promises.writeFile(
              pathSCSSFile,
              pathSCSSFileContent.replace(/\.theme_\d+/g, `.theme_${theme.id}`)
            );
          } catch (error) {
            reject(error);
          }

          resolve("success");
        });
    });

    return theme;
  }
}
