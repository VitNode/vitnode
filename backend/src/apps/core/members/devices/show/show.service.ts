import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";

import { ShowCoreSessionArgs } from "./dto/show.args";
import { ShowCoreSessionObj } from "./dto/show.obj";

import { DatabaseService } from "@/database/database.service";
import { inputPaginationCursor, outputPagination } from "@/functions/database/pagination";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { core_sessions } from "@/apps/admin/core/database/schema/sessions";

@Injectable()
export class ShowCoreSessionService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last
  }: ShowCoreSessionArgs): Promise<ShowCoreSessionObj> {
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

    const itemsParent = await this.databaseService.db.query.core_sessions.findMany({
      ...pagination,
      where: pagination.where,
      with: {
        device: true
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_sessions);

    const edges = await Promise.all(
      itemsParent.map(async item => {
        const children = await this.databaseService.db.query.core_sessions.findMany({ //redundant? Used to be the same on other script
          with: {
            device: true
          }
        });

        return {
          id: item.user_id, 
          ...item          
        };
      })
    );

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
