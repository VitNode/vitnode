import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import { eq } from "drizzle-orm";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { ShowAdminPlugins } from "../show/dto/show.obj";
import { UploadAdminPluginsArgs } from "./dto/upload.args";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";
import { pluginPaths } from "../paths";
import { ConfigPlugin } from "../plugins.module";

import { FileUpload } from "@/utils/graphql-upload/upload";
import { currentDate } from "@/functions/date";
import { core_plugins } from "../../database/schema/plugins";
import { DatabaseService } from "@/database/database.service";
import { generateRandomString } from "@/functions/generate-random-string";
import { CustomError } from "@/utils/errors/custom-error";
import { ChangeTemplatesAdminThemesService } from "../../themes/change_templates.service";
import { updateNavAdminPlugin } from "@/utils/actions/helpers/update-plugins";

@Injectable()
export class UploadAdminPluginsService extends ChangeTemplatesAdminThemesService {
  protected path: string = join(process.cwd());
  protected tempFolderName: string = `${generateRandomString(5)}${currentDate()}`;
  protected tempPath: string = join(
    process.cwd(),
    "temp",
    "plugins",
    this.tempFolderName
  );

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService
  ) {
    super();
  }

  protected async removeTempFolder(): Promise<void> {
    // Delete temp folder
    await fs.promises.rm(this.tempPath, { recursive: true });
  }

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
          // TODO: Fix this type
          tar.extract({
            C: this.tempPath,
            strip: 1
          }) as NodeJS.WritableStream & ReturnType<typeof tar.extract>
        )
        .on("error", err => {
          throw new reject(err.message);
        })
        .on("finish", () => {
          resolve("success");
        });
    });

    const pathInfoJSON = join(this.tempPath, "backend", "plugin.json");
    const pluginFile = await fs.promises.readFile(pathInfoJSON, "utf8");
    const config: Omit<ConfigPlugin, "version_code" | "versions"> =
      JSON.parse(pluginFile);

    // Check if variables exists
    if (!config.name || !config.author || !config.code || !config.support_url) {
      await this.removeTempFolder();
      throw new CustomError({
        code: "PLUGIN_CONFIG_VARIABLES_NOT_FOUND",
        message: "Plugin config variables not found"
      });
    }

    const pathVersionsJSON = join(this.tempPath, "backend", "versions.json");
    const versionsFile = await fs.promises.readFile(pathVersionsJSON, "utf8");
    const versions: Record<string, string> = JSON.parse(versionsFile);

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
    config,
    upload_new_version
  }: {
    config: ConfigPlugin;
    upload_new_version?: boolean;
  }): Promise<void> {
    const newPathBackend = pluginPaths({ code: config.code }).backend.root;
    if (fs.existsSync(newPathBackend)) {
      await fs.promises.rm(newPathBackend, { recursive: true });
    }
    await fs.promises.mkdir(newPathBackend);

    // Copy temp folder to plugin folder
    const backendSource = join(this.tempPath, "backend");
    await fs.promises.cp(backendSource, newPathBackend, { recursive: true });
    if (!upload_new_version) {
      this.changeFilesService.changeFilesWhenCreate({ code: config.code });
    }
  }

  protected async copyFilesToPluginFolder({
    destination,
    source
  }: {
    destination: string;
    source: string;
  }): Promise<void> {
    if (!fs.existsSync(source)) return;

    try {
      await fs.promises.cp(source, destination, {
        recursive: true
      });
    } catch (error) {
      throw new CustomError({
        code: "COPY_FILES_TO_PLUGIN_FOLDER_ERROR",
        message: `Source: ${source}, Destination: ${destination}`
      });
    }
  }

  protected async copyFileToPluginFolder({
    destination,
    source
  }: {
    destination: string;
    source: string;
  }): Promise<void> {
    if (!fs.existsSync(source)) return;

    try {
      await fs.promises.copyFile(source, destination);
    } catch (error) {
      throw new CustomError({
        code: "COPY_FILE_TO_PLUGIN_FOLDER_ERROR",
        message: `Source: ${source}, Destination: ${destination}`
      });
    }
  }

  protected async createPluginFrontend({
    config
  }: {
    config: ConfigPlugin;
  }): Promise<void> {
    const frontendPaths = [
      "admin_pages",
      "admin_templates",
      "pages",
      "hooks",
      "graphql_queries",
      "graphql_mutations"
    ];
    await Promise.all(
      frontendPaths.map(async path => {
        const source = join(this.tempPath, "frontend", path);
        const destination = pluginPaths({ code: config.code }).frontend[path];

        return this.copyFilesToPluginFolder({ source, destination });
      })
    );

    // Copy templates
    const themes = await this.databaseService.db.query.core_themes.findMany({
      columns: {
        id: true
      }
    });
    if (fs.existsSync(join(this.tempPath, "frontend", "templates"))) {
      await Promise.all(
        themes.map(async ({ id }) => {
          await this.changeTemplates({
            tempPath: join(this.tempPath, "frontend", "templates"),
            destinationPath: join(
              process.cwd(),
              "..",
              "frontend",
              "themes",
              id.toString(),
              config.code
            )
          });
        })
      );
    }

    // Copy language
    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        columns: {
          code: true
        }
      });
    languages.forEach(lang => {
      const source = join(
        this.tempPath,
        "frontend",
        "langs",
        `${config.code}.json`
      );
      const destination = join(
        process.cwd(),
        "..",
        "frontend",
        "langs",
        lang.code,
        `${config.code}.json`
      );

      this.copyFileToPluginFolder({ source, destination });
    });
  }

  async upload({
    code,
    file
  }: UploadAdminPluginsArgs): Promise<ShowAdminPlugins> {
    const tgz = await file;
    const config = await this.getPluginConfig({ tgz });

    const checkPlugin =
      await this.databaseService.db.query.core_plugins.findFirst({
        where: (table, { eq }) => eq(table.code, config.code)
      });

    if (checkPlugin && !code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: "PLUGIN_ALREADY_EXISTS",
        message: "Plugin already exists"
      });
    }

    if (code && code !== config.code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: "PLUGIN_CODE_NOT_MATCH",
        message: "Plugin code not match"
      });
    }

    if (checkPlugin && code && config.version_code < checkPlugin.version_code) {
      await this.removeTempFolder();
      throw new CustomError({
        code: "PLUGIN_VERSION_IS_LOWER",
        message: "Plugin version is lower than the current version"
      });
    }

    // Create plugin folder
    await this.createPluginBackend({ config, upload_new_version: !!code });
    await this.createPluginFrontend({ config });
    await this.removeTempFolder();

    if (code) {
      const plugins = await this.databaseService.db
        .update(core_plugins)
        .set({
          updated: new Date(),
          name: config.name,
          description: config.description,
          support_url: config.support_url,
          author: config.author,
          author_url: config.author_url,
          version: config.version,
          version_code: config.version_code,
          allow_default: config.allow_default
        })
        .where(eq(core_plugins.code, code))
        .returning();

      const plugin = plugins[0];

      await updateNavAdminPlugin({
        db: this.databaseService.db,
        id: plugin.id,
        config
      });

      return plugin;
    }

    const plugins = await this.databaseService.db
      .insert(core_plugins)
      .values({
        ...config
      })
      .returning();

    const plugin = plugins[0];

    await updateNavAdminPlugin({
      db: this.databaseService.db,
      id: plugin.id,
      config
    });

    // Run migration
    const migrationPath = pluginPaths({ code: config.code }).backend
      .database_migration;
    if (fs.existsSync(migrationPath)) {
      await migrate(this.databaseService.db, {
        migrationsFolder: migrationPath
      });
    }

    return plugin;
  }
}
