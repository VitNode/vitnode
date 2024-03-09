import { Injectable } from "@nestjs/common";
import { ShowAdminPlugins } from "../show/dto/show.obj";
import { UploadAdminPluginsArgs } from "./dto/upload.args";
import { FileUpload } from "@/utils/graphql-upload/Upload";
import { DatabaseService } from "@/modules/database/database.service";
import { join } from "path";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import * as fsPromises from "fs/promises";
import * as tar from "tar";
import { CustomError } from "@/utils/errors/CustomError";

interface ConfigPlugin {
  name: string;
  description?: string;
  code: string;
  author: string;
  author_url: string;
  support_url: string;
}

@Injectable()
export class UploadAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  protected path: string = join(process.cwd());
  protected tempFolderName: string = `${generateRandomString(5)}${currentDate()}`;
  protected tempPath: string = join(process.cwd(), "temp", "plugins");

  protected async getPluginConfig({
    tgz
  }: {
    tgz: FileUpload;
  }): Promise<ConfigPlugin> {
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

    const pathJSON = join(path, "backend", "plugin.json");
    const pluginFile = await fsPromises.readFile(pathJSON, "utf8");
    const config: ConfigPlugin = JSON.parse(pluginFile);

    // Check if variables exists
    if (!config.name || !config.author || !config.author_url) {
      throw new CustomError({
        code: "PLUGIN_CONFIG_VARIABLES_NOT_FOUND",
        message: "Plugin config variables not found"
      });
    }

    return config;
  }

  async upload({ file }: UploadAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const tgz = await file;
    const config = await this.getPluginConfig({ tgz });

    return "Hello World!";
  }
}
