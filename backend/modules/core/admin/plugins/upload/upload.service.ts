import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";

import { ShowAdminPlugins } from "../show/dto/show.obj";
import { UploadAdminPluginsArgs } from "./dto/upload.args";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";
import { pluginPaths } from "../paths";

import { FileUpload } from "@/utils/graphql-upload/Upload";
import { DatabaseService } from "@/modules/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { currentDate } from "@/functions/date";
import { CustomError } from "@/utils/errors/CustomError";
import { core_plugins } from "../../database/schema/plugins";

interface ConfigPlugin {
  author: string;
  author_url: string;
  code: string;
  name: string;
  support_url: string;
  version: string;
  version_code: number;
  description?: string;
}

@Injectable()
export class UploadAdminPluginsService {
  constructor(
    private databaseService: DatabaseService,
    private changeFilesService: ChangeFilesAdminPluginsService
  ) {}

  protected path: string = join(process.cwd());
  protected tempFolderName: string = `${generateRandomString(5)}${currentDate()}`;
  protected tempPath: string = join(
    process.cwd(),
    "temp",
    "plugins",
    this.tempFolderName
  );

  protected async getPluginConfig({
    tgz
  }: {
    tgz: FileUpload;
  }): Promise<ConfigPlugin> {
    // Create folders
    await fs.promises.mkdir(this.tempPath, { recursive: true });

    // Upload to temp folder
    await new Promise((resolve, reject) => {
      tgz
        .createReadStream()
        .pipe(
          tar.x({
            cwd: this.tempPath
          })
        )
        .on("error", err => {
          reject(err.message);
        })
        .on("finish", () => {
          resolve("success");
        });
    });

    const pathInfoJSON = join(this.tempPath, "backend", "plugin.json");
    const pluginFile = await fs.promises.readFile(pathInfoJSON, "utf8");
    const config: Omit<ConfigPlugin, "versions" | "version_code"> =
      JSON.parse(pluginFile);

    // Check if variables exists
    if (
      !config.name ||
      !config.author ||
      !config.author_url ||
      !config.code ||
      !config.support_url
    ) {
      throw new CustomError({
        code: "PLUGIN_CONFIG_VARIABLES_NOT_FOUND",
        message: "Plugin config variables not found"
      });
    }

    const pathVersionsJSON = join(this.tempPath, "backend", "versions.json");
    const versionsFile = await fs.promises.readFile(pathVersionsJSON, "utf8");
    const versions: { [key: string]: string } = JSON.parse(versionsFile);

    // Find the latest version
    const latestVersion = Object.keys(versions).sort().reverse()[0];
    const version = versions[latestVersion];

    return {
      ...config,
      version,
      version_code: +latestVersion
    };
  }

  protected async createPluginBackend({
    config
  }: {
    config: ConfigPlugin;
  }): Promise<void> {
    const newPathBackend = pluginPaths({ code: config.code }).backend.root;
    if (fs.existsSync(newPathBackend)) {
      throw new CustomError({
        code: "PLUGIN_FOLDER_ALREADY_EXISTS",
        message: "Plugin folder already exists in backend"
      });
    }
    await fs.promises.mkdir(newPathBackend);

    // Copy temp folder to plugin folder
    const backendSource = join(this.tempPath, "backend");
    await fs.promises.cp(backendSource, newPathBackend, { recursive: true });
    this.changeFilesService.changeFilesWhenCreate({ code: config.code });
  }

  protected async createPluginFrontend({
    config
  }: {
    config: ConfigPlugin;
  }): Promise<void> {
    // Admin pages
    const newPathAdminPages = join(
      process.cwd(),
      "..",
      "frontend",
      "app",
      "[locale]",
      "(apps)",
      "(admin)",
      "admin",
      "(auth)",
      config.code
    );

    // Copy temp folder to plugin folder
    const adminPagesSource = join(this.tempPath, "frontend", "admin_pages");
    await fs.promises.cp(adminPagesSource, newPathAdminPages, {
      recursive: true
    });
  }

  async upload({ file }: UploadAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const tgz = await file;
    const config = await this.getPluginConfig({ tgz });

    const checkPlugin =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, config.code)
      });

    if (checkPlugin) {
      throw new CustomError({
        code: "PLUGIN_ALREADY_EXISTS",
        message: "Plugin already exists"
      });
    }

    // Create plugin folder
    await this.createPluginBackend({ config });
    await this.createPluginFrontend({ config });

    // Delete temp folder
    await fs.promises.rm(this.tempPath, { recursive: true });

    // Save plugin to database
    const plugins = await this.databaseService.db
      .insert(core_plugins)
      .values({
        ...config,
        created: currentDate()
      })
      .returning();

    const plugin = plugins[0];

    return plugin;
  }
}
