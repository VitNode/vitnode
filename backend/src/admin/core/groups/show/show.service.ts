import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowAdminGroupsArgs } from './dto/show.args';
import { ShowAdminGroupsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { core_groups } from '@/src/admin/core/database/schema/groups';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

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

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_groups,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_groups.id },
      cursors: [{ order: 'DESC', key: 'updated', schema: core_groups.updated }],
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated'
      },
      sortBy
    });

    const edges = await this.databaseService.db.query.core_groups.findMany({
      ...pagination,
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
