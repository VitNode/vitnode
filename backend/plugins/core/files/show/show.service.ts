import { Injectable } from "@nestjs/common";
import { and, count, eq } from "drizzle-orm";

import { ShowCoreFilesArgs } from "./dto/show.args";
import { ShowCoreFilesObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_files } from "../../admin/database/schema/files";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { User } from "@/utils/decorators/user.decorator";

@Injectable()
export class ShowCoreFilesService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { id: user_id }: User,
    { cursor, first, last }: ShowCoreFilesArgs
  ): Promise<ShowCoreFilesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_files,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_files.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      }
    });

    const where = eq(core_files.user_id, user_id);

    const edges = await this.databaseService.db.query.core_files.findMany({
      ...pagination,
      where: and(pagination.where, where)
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_files)
      .where(where);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
