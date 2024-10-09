import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_groups } from '@/database/schema/groups';
import { core_moderators_permissions } from '@/database/schema/moderators';
import { NotFoundError } from '@/errors';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

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
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_moderators_permissions,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_moderators_permissions.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
    });

    const edges =
      await this.databaseService.db.query.core_moderators_permissions.findMany({
        ...pagination,
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
          unrestricted: true,
        },
      });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_moderators_permissions);

    const processedEdges: ShowAdminStaffModerators[] = await Promise.all(
      edges.map(async edge => {
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

    return outputPagination({
      edges: processedEdges,
      totalCount,
      first,
      cursor,
      last,
    });
  }
}
