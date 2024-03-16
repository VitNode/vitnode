import { Injectable } from "@nestjs/common";
import { and, count, ilike } from "drizzle-orm";

import { ShowAdminPluginsArgs } from "./dto/show.args";
import { ShowAdminPluginsObj } from "./dto/show.obj";

import { DatabaseService } from "@/modules/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_plugins } from "../../database/schema/plugins";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

@Injectable()
export class ShowAdminPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search = "",
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
        column: "updated"
      },
      sortBy
    });

    const edges = await this.databaseService.db.query.core_plugins.findMany({
      ...pagination,
      where: and(pagination.where, ilike(core_plugins.name, `%${search}%`))
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
