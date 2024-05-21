import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import { eq } from "drizzle-orm";

import { DownloadAdminPluginsArgs } from "./dto/download.args";
import { pluginPaths } from "../paths";
import { PluginInfoJSONType } from "../helpers/files/create/contents";
import { ShowAdminNavPluginsObj } from "../nav/show/dto/show.obj";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { currentDate } from "@/functions/date";
import { core_plugins } from "../../database/schema/plugins";
import { execShellCommand } from "@/functions/exec-shell-command";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { removeSpecialCharacters } from "@/functions/remove-special-characters";
import { generateRandomString } from "@/functions/generate-random-string";

@Injectable()
export class DownloadAdminPluginsService {
  protected tempPath = join(process.cwd(), "temp", "plugins");

  constructor(private readonly databaseService: DatabaseService) {}

  protected createFolders(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
    }
  }

  protected copyFiles({
    destination,
    source
  }: {
    destination: string;
    source: string;
  }): void {
    if (fs.existsSync(source)) {
      fs.cpSync(source, destination, {
        recursive: true
      });
    }
  }
  protected async prepareTgz({ code }: { code: string }): Promise<void> {
    // Create temp folder
    const tempPath = join(this.tempPath, code);
    this.createFolders(tempPath);

    // Create folders for backend and frontend
    const backendPath = join(tempPath, "backend");
    this.createFolders(backendPath);
    const frontendPath = join(tempPath, "frontend");
    this.createFolders(frontendPath);

    // Copy backend files
    const backendSource = join(process.cwd(), "src", "plugins", code);
    fs.cpSync(backendSource, backendPath, { recursive: true });

    // Copy frontend files
    const frontendPaths = [
      "admin_pages",
      "admin_templates",
      "pages",
      "hooks",
      "templates",
      "graphql_queries",
      "graphql_mutations"
    ];
    frontendPaths.forEach(path => {
      this.copyFiles({
        destination: join(frontendPath, path),
        source: pluginPaths({ code }).frontend[path]
      });
    });

    // Copy frontend files - language
    const frontendLanguageSource = pluginPaths({ code }).frontend.language;
    if (fs.existsSync(frontendLanguageSource)) {
      fs.cpSync(
        frontendLanguageSource,
        join(frontendPath, "langs", `${code}.json`),
        {
          recursive: true
        }
      );
    }
  }

  protected async createTgz({
    code,
    name
  }: {
    code: string;
    name: string;
  }): Promise<void> {
    this.prepareTgz({ code });

    const path = join(this.tempPath, code);
    try {
      tar
        .c({ gzip: true, file: join("temp", `${name}.tgz`), cwd: path }, ["."])
        .then(() => {
          // Remove temp folder
          fs.rmSync(path, { recursive: true });
        });
    } catch (error) {
      throw new CustomError({
        code: "CREATE_TGZ_ERROR",
        message: "Error creating tgz file"
      });
    }
  }

  protected async updateVersion({
    code,
    version,
    version_code
  }: DownloadAdminPluginsArgs): Promise<void> {
    // Update allow_default in plugin.json
    const pathInfoJSON = pluginPaths({ code }).backend.info;
    const infoJSON: PluginInfoJSONType = JSON.parse(
      fs.readFileSync(pathInfoJSON, "utf-8")
    );
    const allow_default = fs.existsSync(
      pluginPaths({ code }).frontend.default_page
    );
    infoJSON.allow_default = allow_default;

    fs.writeFile(
      pathInfoJSON,
      JSON.stringify(infoJSON, null, 2),
      "utf8",
      err => {
        if (err) {
          throw new CustomError({
            code: "ERROR_UPDATING_INFO_JSON",
            message: err.message
          });
        }
      }
    );

    if (!version || !version_code) {
      // Update only allow_default
      await this.databaseService.db
        .update(core_plugins)
        .set({
          allow_default,
          updated: new Date()
        })
        .where(eq(core_plugins.code, code));

      return;
    }

    await this.databaseService.db
      .update(core_plugins)
      .set({
        version,
        version_code,
        allow_default,
        updated: new Date()
      })
      .where(eq(core_plugins.code, code))
      .returning();

    const pathToVersions = pluginPaths({ code }).backend.versions;
    if (!fs.existsSync(pathToVersions)) {
      throw new CustomError({
        code: "VERSIONS_FILE_NOT_FOUND",
        message: "Versions file not found"
      });
    }

    const versions: Record<number, string> = JSON.parse(
      fs.readFileSync(pathToVersions, "utf-8")
    );
    versions[version_code] = version;
    fs.writeFileSync(pathToVersions, JSON.stringify(versions, null, 2));
  }

  protected async generateMigration({ code }: { code: string }): Promise<void> {
    const path = pluginPaths({ code }).backend.database_migration;
    const schemaPath = pluginPaths({ code }).backend.database_schema;
    if (!fs.existsSync(schemaPath)) return;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
    }

    try {
      await execShellCommand(
        `npx drizzle-kit generate --config src/plugins/${code}/admin/database/drizzle.config.ts`
      );
    } catch (err) {
      throw new CustomError({
        code: "GENERATE_MIGRATION_ERROR",
        message: "Error generating migration"
      });
    }
  }

  async updateNavInConfig({
    code,
    nav
  }: {
    code: string;
    nav: ShowAdminNavPluginsObj[];
  }): Promise<void> {
    const path = pluginPaths({ code }).backend.info;
    const readFile = fs.readFileSync(path, "utf-8");
    const infoJSON: PluginInfoJSONType = JSON.parse(readFile);

    const updateObj = {
      ...infoJSON,
      nav: nav.map(item => ({
        code: item.code,
        href: item.href,
        icon: item.icon
      }))
    };

    fs.writeFileSync(path, JSON.stringify(updateObj, null, 2));
  }

  async download(
    { code, version, version_code }: DownloadAdminPluginsArgs,
    { id: userId }: User
  ): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
      with: {
        nav: true
      }
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    await this.generateMigration({ code });
    await this.updateVersion({ code, version, version_code });
    await this.updateNavInConfig({ code, nav: plugin.nav });

    // Tgs
    const name = removeSpecialCharacters(
      `${code}${
        version && version_code ? version_code : plugin.version_code
      }--${userId}-${generateRandomString(5)}-${currentDate()}`
    );
    await this.createTgz({ code, name });

    return `${name}.tgz`;
  }
}
