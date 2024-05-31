import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { eq, sql } from "drizzle-orm";

import { DeleteAdminPluginsArgs } from "./dto/delete.args";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins } from "../../database/schema/plugins";
import { DatabaseService } from "@/database/database.service";
import { CustomError } from "@/utils/errors/custom-error";
import { setRebuildRequired } from "@/functions/rebuild-required";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class DeleteAdminPluginsService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly changeFilesService: ChangeFilesAdminPluginsService
  ) {}

  protected deleteFolderWhenExists(path: string) {
    if (fs.existsSync(path)) {
      fs.rmSync(path, { recursive: true });
    }
  }

  protected async deleteMigration({ code }: { code: string }) {
    const migrationPathInfo = ABSOLUTE_PATHS.plugin({ code }).database
      .migration_info;
    if (!fs.existsSync(migrationPathInfo)) return;

    const migrationData: { entries: { when: number }[] } = JSON.parse(
      fs.readFileSync(migrationPathInfo, "utf-8")
    );
    const deleteQueries = migrationData.entries.map(entry => {
      return `DELETE FROM drizzle.__drizzle_migrations WHERE created_at = ${entry.when};`;
    });

    try {
      await this.databaseService.db.execute(sql.raw(deleteQueries.join(" ")));
    } catch (error) {
      throw new CustomError({
        code: "DELETE_TABLE_ERROR",
        message: `Error deleting migration for plugin ${code}`
      });
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
    await this.deleteMigration({ code });
    const tables: { getTables: () => string[] } = await import(
      `../../../../${code}/admin/database/functions`
    );
    const deleteQueries = tables
      .getTables()
      .filter(el => !el.endsWith("_relations"))
      .map(table => {
        return `DROP TABLE IF EXISTS ${table} CASCADE;`;
      });

    try {
      await this.databaseService.db.execute(sql.raw(deleteQueries.join(" ")));
    } catch (error) {
      throw new CustomError({
        code: "DELETE_TABLE_ERROR",
        message: `Error deleting tables for plugin ${code}`
      });
    }

    this.changeFilesService.changeFilesWhenDelete({ code });

    const modulePath = ABSOLUTE_PATHS.plugin({ code }).root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = ["admin_pages", "admin_templates", "pages", "plugin"];
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS.plugin({ code }).frontend[path]
      );
    });

    // Frontend - Delete Templates
    const themes = await this.databaseService.db.query.core_themes.findMany({
      columns: {
        id: true
      }
    });
    themes.forEach(({ id }) => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS.plugin({ code }).frontend.theme({
          theme_id: id
        })
      );
    });

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    await setRebuildRequired({ set: "plugins" });

    return "Success!";
  }
}
