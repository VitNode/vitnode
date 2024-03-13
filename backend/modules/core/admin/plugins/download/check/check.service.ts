import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { CheckDownloadAdminPluginsArgs } from "./dto/check.args";
import { CheckDownloadAdminPluginsObj } from "./dto/check.obj";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { pluginPaths } from "../../paths";

@Injectable()
export class CheckDownloadAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  protected async checkNumberOfFiles({
    paths
  }: {
    paths: string;
  }): Promise<number> {
    return fs.existsSync(paths)
      ? (await fs.promises.readdir(paths, { recursive: true })).filter(
          fileName => fileName.includes(".")
        ).length
      : 0;
  }

  async check({
    code
  }: CheckDownloadAdminPluginsArgs): Promise<CheckDownloadAdminPluginsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    return {
      databases: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).backend.database_schema
      }),
      admin_pages: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.admin_pages
      }),
      admin_templates: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.admin_templates
      }),
      pages: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.pages
      }),
      pages_container: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.pages_container
      }),
      default_page: fs.existsSync(pluginPaths({ code }).frontend.default_page),
      language: fs.existsSync(pluginPaths({ code }).frontend.language),
      hooks: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.hooks
      }),
      templates: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.templates
      }),
      graphql_mutations: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.graphql_mutations
      }),
      graphql_queries: await this.checkNumberOfFiles({
        paths: pluginPaths({ code }).frontend.graphql_queries
      })
    };
  }
}
