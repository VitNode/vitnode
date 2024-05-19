import { Injectable } from "@nestjs/common";

import { ShowAdminNavPluginsArgs } from "./dto/show.args";
import { ShowAdminNavPluginsObj } from "./dto/show.obj";

import { NotFoundError } from "@/utils/errors/not-found-error";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class ShowAdminNavPluginsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    plugin_code
  }: ShowAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj[]> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, plugin_code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const nav = await this.databaseService.db.query.core_plugins_nav.findMany({
      where: (table, { eq }) => eq(table.plugin_id, plugin.id),
      orderBy: (table, { asc }) => asc(table.position)
    });

    return nav;
  }
}
