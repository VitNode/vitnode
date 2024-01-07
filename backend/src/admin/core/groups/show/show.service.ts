import { Injectable } from '@nestjs/common';
import { count, eq, like } from 'drizzle-orm';

import { ShowAdminGroupsArgs } from './dto/show.args';
import { ShowAdminGroupsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { core_groups, core_groups_names } from '@/src/admin/core/database/schema/groups';
import { outputPagination, inputPagination } from '@/functions/database/pagination';

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
    const where = like(core_groups_names.value, `%${search}%`);

    const edges = await this.databaseService.db.query.core_groups.findMany({
      ...inputPagination({
        cursor,
        first,
        last,
        where
      }),
      orderBy: (table, { asc }) => [asc(table.updated)],
      with: {
        name: {
          columns: {
            value: true,
            language_id: true
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
          .from(core_groups)
          .where(eq(core_groups.id, edge.id));

        return {
          ...edge,
          users_count: usersCount[0].count
        };
      })
    );

    return outputPagination({ edges: currentEdges, totalCount, first, cursor, last });
  }
}
