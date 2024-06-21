import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike } from "drizzle-orm";

import { ShowAdminPluginsArgs } from "./dto/show.args";
import { ShowAdminPluginsObj } from "./dto/show.obj";

import { inputPaginationCursor, outputPagination } from "../../../../functions";
import { core_plugins } from "../../../../templates/core/admin/database/schema/plugins";
import { SortDirectionEnum } from "../../../../utils";
import { DatabaseService } from "../../../../database";

@Injectable()
export class ShowAdminPluginsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    code,
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
      primaryCursor: {
        column: "id",
        schema: core_plugins.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "updated"
      },
      sortBy
    });

    const where = code
      ? eq(core_plugins.code, code)
      : ilike(core_plugins.name, `%${search}%`);

    const edges = await this.databaseService.db.query.core_plugins.findMany({
      ...pagination,
      where: and(pagination.where, where)
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_plugins)
      .where(where);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
