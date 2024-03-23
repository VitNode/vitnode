import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";
import { eq, sql } from "drizzle-orm";

import { DeleteAdminPluginsArgs } from "./dto/delete.args";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";
import { pluginPaths } from "../paths";

import { DatabaseService } from "@/plugins/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins } from "../../database/schema/plugins";
import { CustomError } from "@/utils/errors/CustomError";
import { setRebuildRequired } from "@/functions/config/rebuild-required";

@Injectable()
export class DeleteAdminPluginsService {
  constructor(
    private databaseService: DatabaseService,
    private changeFilesService: ChangeFilesAdminPluginsService
  ) {}

  protected deleteFolderWhenExists(path: string) {
    if (fs.existsSync(path)) {
      fs.rmSync(path, { recursive: true });
    }
  }

  async delete({ code }: DeleteAdminPluginsArgs): Promise<string> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    if (plugin.default) {
      throw new CustomError({
        code: "DEFAULT_PLUGIN",
        message: "This plugin is default and cannot be deleted"
      });
    }

    // Drop tables
    const tables: { getTables: () => string[] } = await import(
      `../../../../${code}/admin/database/functions`
    );
    Promise.all(
      tables.getTables().map(async table => {
        try {
          await this.databaseService.db.execute(
            sql.raw(`DROP TABLE IF EXISTS ${table}`)
          );
        } catch (error) {
          throw new CustomError({
            code: "DELETE_TABLE_ERROR",
            message: `Error deleting table ${table}`
          });
        }
      })
    );

    this.changeFilesService.changeFilesWhenDelete({ code });

    const modulePath = pluginPaths({ code }).backend.root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = [
      "admin_pages",
      "admin_templates",
      "pages",
      "hooks",
      "graphql_queries",
      "graphql_mutations"
    ];
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(pluginPaths({ code }).frontend[path]);
    });

    // Frontend - Delete Templates
    const themes = await this.databaseService.db.query.core_themes.findMany({
      columns: {
        id: true
      }
    });
    themes.forEach(({ id }) => {
      this.deleteFolderWhenExists(
        join(process.cwd(), "..", "frontend", "themes", id.toString(), code)
      );
    });

    // Frontend - Delete Language
    const languages =
      await this.databaseService.db.query.core_languages.findMany({
        columns: {
          code: true
        }
      });
    languages.forEach(lang => {
      this.deleteFolderWhenExists(
        join(
          process.cwd(),
          "..",
          "frontend",
          "langs",
          lang.code,
          `${code}.json`
        )
      );
    });

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    await setRebuildRequired({ set: "plugins" });

    return "Success!";
  }
}
