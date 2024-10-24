import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { core_moderators_permissions } from '@/database/schema/moderators';
import { NotFoundError } from '@/errors';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import {
  ShowAdminStaffModerators,
  ShowAdminStaffModeratorsArgs,
  ShowAdminStaffModeratorsObj,
} from './show.dto';

@Injectable()
export class ShowAdminStaffModeratorsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
  ) {}

  async show({
    cursor,
    first,
    last,
    sortBy,
  }: ShowAdminStaffModeratorsArgs): Promise<ShowAdminStaffModeratorsObj> {
    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_moderators_permissions,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
      query: async args =>
        await this.databaseService.db.query.core_moderators_permissions.findMany(
          {
            ...args,
            with: {
              group: {
                columns: {
                  id: true,
                  color: true,
                },
              },
            },
            columns: {
              id: true,
              user_id: true,
              updated: true,
              group_id: true,
              created: true,
              protected: true,
            },
          },
        ),
    });

    const edges: ShowAdminStaffModerators[] = await Promise.all(
      pagination.edges.map(async edge => {
        if (edge.user_id) {
          const user = await getUser({
            id: edge.user_id,
            db: this.databaseService.db,
          });

          return {
            ...edge,
            user_or_group: {
              ...user,
            },
          };
        }

        if (!edge.group) {
          throw new NotFoundError('Group');
        }

        const group_name = await this.stringLanguageHelper.get({
          database: core_groups,
          item_ids: [edge.group.id],
          plugin_code: 'core',
          variables: ['name'],
        });

        return {
          ...edge,
          user_or_group: {
            ...edge.group,
            group_name,
          },
        };
      }),
    );

    return { ...pagination, edges };
  }
}
