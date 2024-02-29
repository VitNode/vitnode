import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike, inArray, or } from "drizzle-orm";

import { ShowAdminMembersObj } from "./dto/show.obj";
import { ShowAdminMembersArgs } from "./dto/show.args";

import { DatabaseService } from "@/src/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/src/functions/database/pagination";
import { core_users } from "@/src/modules/admin/core/database/schema/users";
import { SortDirectionEnum } from "@/src/types/database/sortDirection.type";

@Injectable()
export class ShowAdminMembersService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    groups,
    last,
    search,
    sortBy
  }: ShowAdminMembersArgs): Promise<ShowAdminMembersObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_users,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_users.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "joined"
      },
      sortBy
    });

    const where = and(
      or(
        ilike(core_users.name, `%${search}%`),
        ilike(core_users.email, `%${search}%`),
        Number(search) ? eq(core_users.id, Number(search)) : undefined
      ),
      groups && groups.length > 0
        ? inArray(core_users.group_id, groups)
        : undefined
    );

    const edges = await this.databaseService.db.query.core_users.findMany({
      ...pagination,
      where: and(pagination.where, where),
      columns: {
        password: false
      },
      with: {
        group: {
          with: {
            name: true
          }
        },
        avatar: true
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(where);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
