import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowAdminPluginsArgs } from "./dto/show.args";
import { ShowAdminPluginsObj } from "./dto/show.obj";

import { DatabaseService } from "@/src/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/src/functions/database/pagination";
import { core_plugins } from "../../database/schema/plugins";
import { SortDirectionEnum } from "@/src/types/database/sortDirection.type";

@Injectable()
export class ShowAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    sortBy
  }: ShowAdminPluginsArgs): Promise<ShowAdminPluginsObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_plugins,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_plugins.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      },
      sortBy
    });

    const edges = await this.databaseService.db.query.core_plugins.findMany({
      ...pagination
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_plugins);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
