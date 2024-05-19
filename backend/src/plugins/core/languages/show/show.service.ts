import { Injectable } from "@nestjs/common";
import { and, count, ilike } from "drizzle-orm";

import { ShowCoreLanguagesArgs } from "./dto/show.args";
import { ShowCoreLanguagesObj } from "./dto/show.obj";

import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_languages } from "@/plugins/core/admin/database/schema/languages";
import { DatabaseService } from "@/database/database.service";
import { SortDirectionEnum } from "@/utils/types/database/sort-direction.type";

@Injectable()
export class ShowCoreLanguageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search = "",
    sortBy
  }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_languages,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: core_languages.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      },
      sortBy
    });

    const where = ilike(core_languages.name, `%${search}%`);

    const edges = await this.databaseService.db.query.core_languages.findMany({
      ...pagination,
      where: and(pagination.where, where)
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages)
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
