import * as fs from "fs";

import { Injectable } from "@nestjs/common";
import { eq, sql } from "drizzle-orm";
import { NotFoundError, CustomError } from "@vitnode/backend";

import { DeleteAdminPluginsArgs } from "./dto/delete.args";
import { ChangeFilesAdminPluginsService } from "../helpers/files/change/change.service";

import { core_plugins } from "../../database/schema/plugins";
import { DatabaseService } from "@/database/database.service";
import { setRebuildRequired } from "@/functions/rebuild-required";
import { ABSOLUTE_PATHS } from "@/config";
import { core_migrations } from "../../database/schema/files";

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
    await this.databaseService.db
      .delete(core_migrations)
      .where(eq(core_migrations.plugin, code));
    this.changeFilesService.changeFilesWhenDelete({ code });

    const modulePath = ABSOLUTE_PATHS.plugin({ code }).root;
    this.deleteFolderWhenExists(modulePath);
    // Frontend
    const frontendPaths = ["admin_pages", "pages", "plugin", "pages_container"];
    frontendPaths.forEach(path => {
      this.deleteFolderWhenExists(
        ABSOLUTE_PATHS.plugin({ code }).frontend[path]
      );
    });

    await this.databaseService.db
      .delete(core_plugins)
      .where(eq(core_plugins.code, code));

    await setRebuildRequired({ set: "plugins" });

    return "Success!";
  }
}
