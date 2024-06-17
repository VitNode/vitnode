import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";
import {
  inputPaginationCursor,
  outputPagination,
  SortDirectionEnum
} from "@vitnode/backend";

import { ShowCoreThemesObj } from "./dto/show.obj";
import { ShowCoreThemesArgs } from "./dto/show.args";

import { core_themes } from "@/plugins/core/admin/database/schema/themes";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class ShowCoreThemesService {
  constructor(private readonly databaseService: DatabaseService) {}

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
      primaryCursor: {
        column: "id",
        schema: core_themes.id
      },
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
