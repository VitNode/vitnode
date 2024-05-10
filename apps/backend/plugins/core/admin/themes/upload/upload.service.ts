import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import { eq } from "drizzle-orm";

import { UploadAdminThemesArgs } from "./dto/upload.args";
import { ConfigTheme } from "../themes.module";
import { ShowAdminThemes } from "../show/dto/show.obj";
import { ChangeTemplatesAdminThemesService } from "../change_templates.service";

import { DatabaseService } from "@/plugins/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { core_themes } from "../../database/schema/themes";
import { FileUpload } from "@/utils/graphql-upload/Upload";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { setRebuildRequired } from "@/functions/config/rebuild-required";

@Injectable()
export class UploadAdminThemesService extends ChangeTemplatesAdminThemesService {
  constructor(private databaseService: DatabaseService) {
    super();
  }

  protected path: string = join(process.cwd(), "..", "frontend", "themes");
  protected tempPath: string = join(
    process.cwd(),
    "temp",
    "themes",
    `${generateRandomString(5)}${currentDate()}`
  );

  protected async getThemeConfig({
    tgz
  }: {
    tgz: FileUpload;
  }): Promise<ConfigTheme> {
    // Create folders
    await fs.promises.mkdir(this.tempPath, { recursive: true });

    // Upload to temp folder
    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          // TODO: Fix this type
          tar.extract({
            C: this.tempPath,
            strip: 1
          }) as ReturnType<typeof tar.extract> & NodeJS.WritableStream
        )
        .on("error", err => {
          reject(err.message);
        })
        .on("finish", () => {
          resolve("success");
        });
    });

    const pathThemeJSON = join(this.tempPath, "theme.json");
    const themeFile = await fs.promises.readFile(pathThemeJSON, "utf8");
    const config: ConfigTheme = JSON.parse(themeFile);

    // Check if variables exists
    if (!config.name || !config.author || !config.support_url) {
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

  protected async deleteTempFolder(): Promise<void> {
    await fs.promises.rm(this.tempPath, { recursive: true });
  }

  async upload({ file, id }: UploadAdminThemesArgs): Promise<ShowAdminThemes> {
    const tgz = await file;
    const config = await this.getThemeConfig({ tgz });
    const pathSCSSFile = join(this.tempPath, "core", "layout", "global.scss");
    const pathSCSSFileContent = await fs.promises.readFile(
      pathSCSSFile,
      "utf8"
    );

    // Update existing theme
    if (id) {
      const theme = await this.databaseService.db.query.core_themes.findFirst({
        where: (table, { eq }) => eq(table.id, id)
      });

      if (!theme) {
        await this.deleteTempFolder();
        throw new NotFoundError("Theme");
      }

      if (theme.protected) {
        await this.deleteTempFolder();
        throw new CustomError({
          code: "THEME_PROTECTED",
          message: "Theme is protected and cannot be updated"
        });
      }

      if (config.version_code < theme.version_code) {
        await this.deleteTempFolder();
        throw new CustomError({
          code: "THEME_VERSION_CODE_LOWER",
          message: "Version code is lower than the current version"
        });
      }

      // Update CSS files
      await fs.promises.writeFile(
        pathSCSSFile,
        pathSCSSFileContent.replaceAll(/\.theme_\d+/g, `.theme_${id}`)
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { name, ...rest } = config;

      const themesUpdate = await this.databaseService.db
        .update(core_themes)
        .set({
          ...rest
        })
        .where(eq(core_themes.id, id))
        .returning();

      // Copy from temp to frontend
      await this.changeTemplates({
        tempPath: this.tempPath,
        destinationPath: join(this.path, `${theme.id}`)
      });

      await this.deleteTempFolder();
      const themeUpdate = themesUpdate[0];
      await setRebuildRequired({ set: "themes" });

      return themeUpdate;
    }

    // Save theme to database
    const themes = await this.databaseService.db
      .insert(core_themes)
      .values({
        name: config.name,
        version: config.version,
        version_code: config.version_code,
        author: config.author,
        author_url: config.author_url,
        support_url: config.support_url
      })
      .returning();

    const theme = themes[0];

    // Update CSS files
    await fs.promises.writeFile(
      pathSCSSFile,
      pathSCSSFileContent.replaceAll(/\.theme_\d+/g, `.theme_${theme.id}`)
    );

    // Copy from temp to frontend
    const destination = join(this.path, `${theme.id}`);
    if (!fs.existsSync(destination)) {
      await fs.promises.mkdir(destination);
    } else {
      await this.deleteTempFolder();
      throw new CustomError({
        code: "THEME_FOLDER_EXISTS",
        message: `Theme folder already exists: ${destination}`
      });
    }

    try {
      await fs.promises.cp(this.tempPath, destination, {
        recursive: true
      });
    } catch (error) {
      throw new CustomError({
        code: "COPY_FILES_TO_THEME_FOLDER_ERROR",
        message: `Source: ${this.tempPath}, Destination: ${destination}, Error: ${error}`
      });
    }

    await this.deleteTempFolder();
    await setRebuildRequired({ set: "themes" });

    return theme;
  }
}
