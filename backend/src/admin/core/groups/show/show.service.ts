import { Injectable } from '@nestjs/common';
import { count, eq, ilike, inArray } from 'drizzle-orm';

import { ShowAdminGroupsArgs } from './dto/show.args';
import { ShowAdminGroupsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import {
  core_groups,
  core_members,
  core_groups_names
} from '@/src/admin/core/database/schema/groups';
import { outputPagination } from '@/functions/database/pagination';

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
    // let filtersName: string[] = [];

    // if (search) {
    //   filtersName = await this.databaseService.db
    //     .select({ group_id: core_groups_names.group_id })
    //     .from(core_groups_names)
    //     .where(ilike(core_groups_names.value, `%${search}%`))
    //     .then(res => res.map(({ group_id }) => group_id));
    // }

    // const pagination = await inputPaginationCursor({
    //   databaseService: this.databaseService,
    //   cursor,
    //   database: core_groups,
    //   first,
    //   last
    // });

    // const test123 = await this.databaseService.db.query.core_members.findMany(
    //   withCursorPagination({
    //     // where: eq(schema.post.status, 'published'), // 'where' is optional
    //     limit: 5,
    //     cursors: [
    //       [
    //         core_members.joined, // Column to use for cursor
    //         'desc' // Sort order ('asc' or 'desc')
    //         // '1704743328' // Cursor value
    //       ],
    //       [
    //         core_members.id, // Column to use for cursor
    //         'asc' // Sort order ('asc' or 'desc')
    //         // '11' // Cursor value
    //       ]
    //     ]
    //   })
    // );

    const edges = await this.databaseService.db.query.core_groups.findMany({
      // ...inputPagination({
      //   cursor,
      //   first,
      //   last,
      //   where: search && filtersName.length > 0 ? inArray(core_groups.id, filtersName) : undefined
      // }),
      where: (table, { gt }) => gt(table.id, 0),
      limit: 10,
      orderBy: (table, { desc, asc }) => [desc(table.updated), asc(table.id)],
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
      edges: currentEdges,
      totalCount,
      first,
      cursor,
      last
    });

    return test;
  }
}
