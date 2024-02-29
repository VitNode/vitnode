import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowCoreThemesObj } from "./dto/show.obj";
import { ShowCoreThemesArgs } from "./dto/show.args";

import { DatabaseService } from "@/src/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/src/functions/database/pagination";
import { SortDirectionEnum } from "@/src/types/database/sortDirection.type";
import { core_themes } from "@/src/modules/admin/core/database/schema/themes";

@Injectable()
export class ShowCoreThemesService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowCoreThemesArgs): Promise<ShowCoreThemesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_themes,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_themes.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: "created"
      }
    });

    const edges = await this.databaseService.db.query.core_themes.findMany({
      ...pagination
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_themes);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
