import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike, or } from "drizzle-orm";

import { ShowCoreFilesArgs } from "./dto/show.args";
import { ShowCoreFilesObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import {
  core_files_using,
  core_files
} from "../../admin/database/schema/files";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { User } from "@/utils/decorators/user.decorator";

@Injectable()
export class ShowCoreFilesService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { id: user_id }: User,
    { cursor, first, last, search = "", sortBy }: ShowCoreFilesArgs
  ): Promise<ShowCoreFilesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_files,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: core_files.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      },
      sortBy
    });

    const where = and(
      eq(core_files.user_id, user_id),
      or(
        ilike(core_files.file_name_original, `%${search}%`),
        ilike(core_files.file_name, `%${search}%`),
        ilike(core_files.file_alt, `%${search}%`)
      )
    );

    const initEdges = await this.databaseService.db.query.core_files.findMany({
      ...pagination,
      where: and(pagination.where, where)
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_files)
      .where(where);

    const edges = await Promise.all(
      initEdges.map(async edge => {
        const countFileUsing = await this.databaseService.db
          .select({
            count: count()
          })
          .from(core_files_using)
          .where(eq(core_files_using.file_id, edge.id));

        return {
          ...edge,
          count_uses: countFileUsing[0].count
        };
      })
    );

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
