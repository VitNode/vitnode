import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import * as tar from "tar";
import { eq } from "drizzle-orm";
import {
  currentUnixDate,
  generateRandomString,
  removeSpecialCharacters,
} from "@vitnode/shared";

import { DownloadAdminPluginsArgs } from "./dto/download.args";

import { DatabaseService } from "../../../../database";
import { CustomError, NotFoundError } from "../../../../errors";
import { execShellCommand } from "../../../../functions";
import { User } from "../../../../decorators";
import { ABSOLUTE_PATHS_BACKEND, PluginInfoJSONType } from "../../../..";
import { core_plugins } from "../../../../templates/core/admin/database/schema/plugins";

@Injectable()
export class DownloadAdminPluginsService {
  protected tempPath = join(ABSOLUTE_PATHS_BACKEND.uploads.temp, "plugins");

  constructor(private readonly databaseService: DatabaseService) {}

  protected createFolders(path: string): void {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }
  }

  protected copyFiles({
    destination,
    source,
  }: {
    destination: string;
    source: string;
  }): void {
    if (fs.existsSync(source)) {
      fs.cpSync(source, destination, {
        recursive: true,
      });
    }
  }

  protected async prepareTgz({ code }: { code: string }): Promise<string> {
    // Create temp folder
    const tempNameFolder = `${code}-download-${generateRandomString(5)}-${currentUnixDate()}`;
    const tempPath = join(this.tempPath, tempNameFolder);
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
    const frontendPaths = ["admin_pages", "pages", "plugin", "pages_container"];
    frontendPaths.forEach(path => {
      this.copyFiles({
        destination: join(frontendPath, path),
        source: ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend[path],
      });
    });

    return tempPath;
  }

  protected async updateVersion({
    code,
    version,
    version_code,
  }: DownloadAdminPluginsArgs): Promise<void> {
    // Update allow_default in config.json
    const pathInfoJSON = ABSOLUTE_PATHS_BACKEND.plugin({ code }).config;
    const infoJSON: PluginInfoJSONType = JSON.parse(
      fs.readFileSync(pathInfoJSON, "utf-8"),
    );
    const allow_default = fs.existsSync(
      ABSOLUTE_PATHS_BACKEND.plugin({ code }).frontend.default_page,
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
            message: err.message,
          });
        }
      },
    );

    if (!version || !version_code) {
      // Update only allow_default
      await this.databaseService.db
        .update(core_plugins)
        .set({
          allow_default,
          updated: new Date(),
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
        updated: new Date(),
      })
      .where(eq(core_plugins.code, code))
      .returning();

    const pathToVersions = ABSOLUTE_PATHS_BACKEND.plugin({ code }).versions;
    if (!fs.existsSync(pathToVersions)) {
      throw new CustomError({
        code: "VERSIONS_FILE_NOT_FOUND",
        message: "Versions file not found",
      });
    }

    const versions: Record<number, string> = JSON.parse(
      fs.readFileSync(pathToVersions, "utf-8"),
    );
    versions[version_code] = version;
    fs.writeFileSync(pathToVersions, JSON.stringify(versions, null, 2));
  }

  protected async generateMigration({ code }: { code: string }): Promise<void> {
    const path = ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.migrations;
    const schemaPath = ABSOLUTE_PATHS_BACKEND.plugin({ code }).database.schema;
    if (!fs.existsSync(schemaPath)) return;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true,
      });
    }

    try {
      await execShellCommand(
        `npx drizzle-kit up --config src/plugins/${code}/admin/database/drizzle.config.ts && npx drizzle-kit generate --config src/plugins/${code}/admin/database/drizzle.config.ts`,
      );
    } catch (err) {
      throw new CustomError({
        code: "GENERATE_MIGRATION_ERROR",
        message: "Error generating migration",
      });
    }
  }

  async download(
    { code, version, version_code }: DownloadAdminPluginsArgs,
    { id: userId }: User,
  ): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code),
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    await this.generateMigration({ code });
    await this.updateVersion({ code, version, version_code });

    // Tgs
    const name = removeSpecialCharacters(
      `${code}${
        version && version_code ? version_code : plugin.version_code
      }--${userId}-${generateRandomString(5)}-${currentUnixDate()}`,
    );
    const tempPath = await this.prepareTgz({ code });

    try {
      tar
        .c(
          {
            gzip: true,
            file: join(ABSOLUTE_PATHS_BACKEND.uploads.temp, `${name}.tgz`),
            cwd: tempPath,
          },
          ["."],
        )
        .then(() => {
          // Remove temp folder
          fs.rmSync(tempPath, { recursive: true });
        });
    } catch (error) {
      throw new CustomError({
        code: "CREATE_TGZ_ERROR",
        message: "Error creating tgz file",
      });
    }

    return `${name}.tgz`;
  }
}
