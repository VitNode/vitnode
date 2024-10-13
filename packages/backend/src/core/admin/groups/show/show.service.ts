import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { core_users } from '@/database/schema/users';
import { SortDirectionEnum } from '@/utils';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowAdminGroupsArgs, ShowAdminGroupsObj } from './show.dto';

@Injectable()
export class ShowAdminGroupsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

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

    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_groups,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
      query: async args =>
        await this.databaseService.db.query.core_groups.findMany(args),
    });

    const ids = pagination.edges.map(edge => edge.id);
    const names = await this.stringLanguageHelper.get({
      database: core_groups,
      item_ids: ids,
      plugin_code: 'core',
      variables: ['name'],
    });

    const edges = await Promise.all(
      pagination.edges.map(async edge => {
        const usersCount = await this.databaseService.db
          .select({ count: count() })
          .from(core_users)
          .where(eq(core_users.group_id, edge.id));

        return {
          ...edge,
          users_count: usersCount[0].count,
          content: {
            files_allow_upload: edge.files_allow_upload,
            files_max_storage_for_submit: edge.files_max_storage_for_submit,
            files_total_max_storage: edge.files_total_max_storage,
          },
          name: names.filter(name => name.item_id === edge.id),
        };
      }),
    );

    return {
      ...pagination,
      edges,
    };
  }
}
