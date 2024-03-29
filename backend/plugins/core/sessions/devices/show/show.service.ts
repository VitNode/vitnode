import { Injectable } from "@nestjs/common";
import { and, count, eq } from "drizzle-orm";

import { ShowCoreSessionDevicesArgs } from "./dto/show.args";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { User } from "@/utils/decorators/user.decorator";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_sessions } from "@/plugins/core/admin/database/schema/sessions";
import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class ShowCoreSessionDevicesService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, last }: ShowCoreSessionDevicesArgs,
    user: User
  ): Promise<ShowCoreSessionDevicesObj> {
    // TODO: Fix pagination / change primaryCursor
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

    const edges = await this.databaseService.db.query.core_sessions
      .findMany({
        ...pagination,
        where: and(pagination.where, where),
        with: {
          device: true
        }
      })
      .then(userDevices =>
        userDevices.map(item => ({
          id: item.device.id,
          ...item
        }))
      );

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
