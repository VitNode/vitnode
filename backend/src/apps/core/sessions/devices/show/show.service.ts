import { Injectable } from "@nestjs/common";
import { and, count, eq } from "drizzle-orm";

import { DatabaseService } from "@/database/database.service";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { User } from "@/utils/decorators/user.decorator";
import { inputPaginationCursor, outputPagination } from "@/functions/database/pagination";
import { core_sessions } from "@/apps/admin/core/database/schema/sessions";

import { ShowCoreSessionDevicesArgs } from "./dto/show.args";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

@Injectable()
export class ShowCoreSessionDevicesService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowCoreSessionDevicesArgs,
  user: User): 
    Promise<ShowCoreSessionDevicesObj> {
      const pagination = await inputPaginationCursor({
        cursor,
        database: core_sessions,
        databaseService: this.databaseService,
        first,
        last,
        primaryCursor: { order: "ASC", key: "id", schema: core_sessions.user_id },
        defaultSortBy: {
          direction: SortDirectionEnum.asc,
          column: "position"
        }
      });

      const where = eq(core_sessions.user_id, user.id);

      const edges = await this.databaseService.db.query.core_sessions.findMany({
        ...pagination,
        where: and(pagination.where, where),
        with: {
          device: true
        }
      });

      const totalCount = await this.databaseService.db
        .select({ count: count() })
        .from(core_sessions);    

      return outputPagination({
        edges,
        totalCount,
        first,
        cursor,
        last
      });
  }
}
