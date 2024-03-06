import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowCoreSessionDevicesArgs } from "./dto/show.args";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import { DatabaseService } from "@/database/database.service";
import { inputPaginationCursor, outputPagination } from "@/functions/database/pagination";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { core_sessions } from "@/apps/admin/core/database/schema/sessions";

@Injectable()
export class ShowCoreSessionDevicesService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowCoreSessionDevicesArgs): Promise<ShowCoreSessionDevicesObj> {
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

    const edges = await this.databaseService.db.query.core_sessions.findMany({
      ...pagination,
      where: pagination.where,
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
