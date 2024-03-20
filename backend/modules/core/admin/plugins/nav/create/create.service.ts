import { Injectable } from "@nestjs/common";

import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { CreateAdminNavPluginsArgs } from "./dto/create.args";

import { DatabaseService } from "@/modules/database/database.service";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { core_plugins_nav } from "../../../database/schema/plugins";

@Injectable()
export class CreateAdminNavPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async create({
    code,
    icon,
    plugin_code
  }: CreateAdminNavPluginsArgs): Promise<ShowAdminNavPluginsObj> {
    const plugin = await this.databaseService.db.query.core_plugins.findFirst({
      where: (table, { eq }) => eq(table.code, plugin_code)
    });

    if (!plugin) {
      throw new NotFoundError("Plugin");
    }

    const nav = await this.databaseService.db
      .insert(core_plugins_nav)
      .values({
        plugin_id: plugin.id,
        code,
        icon
      })
      .returning();

    return nav[0];
  }
}
