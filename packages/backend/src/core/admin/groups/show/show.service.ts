import { core_groups } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { SortDirectionEnum } from '@/utils';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowAdminGroupsArgs, ShowAdminGroupsObj } from './show.dto';

@Injectable()
export class ShowAdminGroupsService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    last,
    // search,
    sortBy,
  }: ShowAdminGroupsArgs): Promise<ShowAdminGroupsObj> {
    // TODO: Add search by name
    // let filtersName: number[] = [];

    // if (search) {
    //   filtersName = await this.databaseService.db
    //     .select({ item_id: core_groups_names.item_id })
    //     .from(core_groups_names)
    //     .where(ilike(core_groups_names.value, `%${search}%`))
    //     .then(res => res.map(({ item_id }) => item_id));
    // }

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_groups,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_groups.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
    });

    // const where =
    //   filtersName.length > 0 ? inArray(core_groups.id, filtersName) : undefined;

    const edges = await this.databaseService.db.query.core_groups.findMany({
      ...pagination,
      // where: and(pagination.where, where),
      with: {
        name: {
          columns: {
            value: true,
            language_code: true,
          },
        },
      },
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_groups);
    // .where(where);

    const currentEdges = await Promise.all(
      edges.map(async edge => {
        const usersCount = await this.databaseService.db
          .select({ count: count() })
          .from(core_users)
          .where(eq(core_users.group_id, edge.id));

        return {
          ...edge,
          users_count: usersCount[0].count,
        };
      }),
    );

    return outputPagination({
      edges: currentEdges.map(edge => ({
        ...edge,
        content: {
          files_allow_upload: edge.files_allow_upload,
          files_max_storage_for_submit: edge.files_max_storage_for_submit,
          files_total_max_storage: edge.files_total_max_storage,
        },
      })),
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
