import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike, inArray } from "drizzle-orm";

import { ShowAdminGroupsArgs } from "./dto/show.args";
import { ShowAdminGroupsObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import {
  core_groups,
  core_groups_names
} from "@/plugins/core/admin/database/schema/groups";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { core_users } from "../../database/schema/users";

@Injectable()
export class ShowAdminGroupsService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search,
    sortBy
  }: ShowAdminGroupsArgs): Promise<ShowAdminGroupsObj> {
    let filtersName: number[] = [];

    if (search) {
      filtersName = await this.databaseService.db
        .select({ group_id: core_groups_names.group_id })
        .from(core_groups_names)
        .where(ilike(core_groups_names.value, `%${search}%`))
        .then(res => res.map(({ group_id }) => group_id));
    }

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_groups,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_groups.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "updated"
      },
      sortBy
    });

    const where =
      filtersName.length > 0 ? inArray(core_groups.id, filtersName) : undefined;

    const edges = await this.databaseService.db.query.core_groups.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        name: {
          columns: {
            value: true,
            language_code: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_groups)
      .where(where);

    const currentEdges = await Promise.all(
      edges.map(async edge => {
        const usersCount = await this.databaseService.db
          .select({ count: count() })
          .from(core_users)
          .where(eq(core_users.group_id, edge.id));

        return {
          ...edge,
          users_count: usersCount[0].count
        };
      })
    );

    const test = outputPagination({
      edges: search && filtersName.length === 0 ? [] : currentEdges,
      totalCount,
      first,
      cursor,
      last
    });

    return test;
  }
}
