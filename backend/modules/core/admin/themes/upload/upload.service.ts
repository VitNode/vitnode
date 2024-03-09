import * as fsPromises from "fs/promises";
import { join } from "path";
import { writeFile } from "fs/promises";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { UploadAdminThemesArgs } from "./dto/upload.args";
import { ConfigTheme } from "../themes.module";

import { DatabaseService } from "@/modules/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { core_themes } from "../../database/schema/themes";
import { FileUpload } from "@/utils/graphql-upload/Upload";

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
    await fsPromises.mkdir(path, { recursive: true });

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
    const themeFile = await fsPromises.readFile(pathThemeJSON, "utf8");
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
    await fsPromises.rm(path, { recursive: true });

    return config;
  }

  async upload({ file }: UploadAdminThemesArgs): Promise<string> {
    const tgz = await file;
    const config = await this.getThemeConfig({ tgz });

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

    // Create theme folder in frontend
    const newPath = join(this.path, `${theme[0].id}`);
    await fsPromises.mkdir(newPath);

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
            const pathSCSSFileContent = await fsPromises.readFile(
              pathSCSSFile,
              "utf8"
            );
            await writeFile(
              pathSCSSFile,
              pathSCSSFileContent.replace(
                /\.theme_\d+/g,
                `.theme_${theme[0].id}`
              )
            );
          } catch (error) {
            reject(error);
          }

          resolve("success");
        });
    });

    return "Success!";
  }
}
