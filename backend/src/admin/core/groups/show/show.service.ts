import { Injectable } from '@nestjs/common';
import { count, eq, ilike, inArray } from 'drizzle-orm';

import { ShowAdminGroupsArgs } from './dto/show.args';
import { ShowAdminGroupsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { core_groups, core_groups_names } from '@/src/admin/core/database/schema/groups';
import {
  outputPagination,
  inputPagination,
  inputPaginationCursor
} from '@/functions/database/pagination';

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
    let filtersName: string[] = [];

    if (search) {
      filtersName = await this.databaseService.db
        .select({ group_id: core_groups_names.group_id })
        .from(core_groups_names)
        .where(ilike(core_groups_names.value, `%${search}%`))
        .then(res => res.map(({ group_id }) => group_id));
    }

    const pagination = await inputPaginationCursor({
      databaseService: this.databaseService,
      cursor,
      database: core_groups,
      first,
      last
    });

    const edges = await this.databaseService.db.query.core_groups.findMany({
      // ...inputPagination({
      //   cursor,
      //   first,
      //   last,
      //   where: search && filtersName.length > 0 ? inArray(core_groups.id, filtersName) : undefined
      // }),
      limit: pagination.limit,
      where: pagination.where,
      orderBy: (table, { desc }) => [desc(table.updated)],
      with: {
        name: {
          columns: {
            value: true,
            language_code: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_groups);

    const currentEdges = await Promise.all(
      edges.map(async edge => {
        const usersCount = await this.databaseService.db
          .select({ count: count() })
          .from(core_groups)
          .where(eq(core_groups.id, edge.id));

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
