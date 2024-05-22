import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { FilesAdminPluginsArgs } from "./dto/files.args";
import { FilesAdminPluginsObj } from "./dto/files.obj";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { DatabaseService } from "@/database/database.service";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class FilesAdminPluginsService {
  constructor(private readonly databaseService: DatabaseService) {}

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

  async check({ code }: FilesAdminPluginsArgs): Promise<FilesAdminPluginsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const pluginPaths = ABSOLUTE_PATHS.plugin({ code });

    return {
      databases: await this.checkNumberOfFiles({
        paths: pluginPaths.database.schema
      }),
      admin_pages: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.admin_pages
      }),
      admin_templates: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.admin_templates
      }),
      pages: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.pages
      }),
      pages_container: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.pages_container
      }),
      default_page: fs.existsSync(pluginPaths.frontend.default_page),
      language: fs.existsSync(pluginPaths.frontend.language),
      hooks: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.hooks
      }),
      templates: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.templates
      }),
      graphql_mutations: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.graphql_mutations
      }),
      graphql_queries: await this.checkNumberOfFiles({
        paths: pluginPaths.frontend.graphql_queries
      })
    };
  }
}
