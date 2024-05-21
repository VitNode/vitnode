import { Injectable } from "@nestjs/common";

import { ShowCorePluginsObj } from "./dto/show.obj";

import { DatabaseService } from "@/database/database.service";

@Injectable()
export class ShowCorePluginsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show(): Promise<ShowCorePluginsObj[]> {
    const plugins = await this.databaseService.db.query.core_plugins.findMany({
      where: (table, { eq }) => eq(table.enabled, true)
    });

    return plugins;
  }
}
