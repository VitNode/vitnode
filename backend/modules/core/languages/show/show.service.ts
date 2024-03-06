import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowCoreLanguagesArgs } from "./dto/show.args";
import { ShowCoreLanguagesObj } from "./dto/show.obj";

import { DatabaseService } from "@/modules/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_languages } from "@/modules/admin/core/database/schema/languages";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

@Injectable()
export class ShowCoreLanguageService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_languages,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_languages.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: "id"
      }
    });

    const edges = await this.databaseService.db.query.core_languages.findMany({
      ...pagination,
      columns: {
        id: true,
        code: true,
        name: true,
        default: true,
        enabled: true,
        timezone: true,
        protected: true
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_languages);

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
