import { StringLanguageHelper } from '@/core/helpers/string_language/helpers.service';
import { core_admin_permissions } from '@/database/schema/admins';
import { core_groups } from '@/database/schema/groups';
import { NotFoundError } from '@/errors';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';

import { PermissionsStaffObjWithoutPluginName } from '../permissions/dto';
import { PermissionsAdminStaffAdministratorsService } from '../permissions/permissions.service';
import {
  ShowAdminStaffAdministratorsArgs,
  ShowAdminStaffAdministratorsObj,
} from './show.dto';

@Injectable()
export class ShowAdminStaffAdministratorsService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly stringLanguageHelper: StringLanguageHelper,
    private readonly permissionsService: PermissionsAdminStaffAdministratorsService,
  ) {}

  async show({
    cursor,
    first,
    last,
    sortBy,
  }: ShowAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministratorsObj> {
    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_admin_permissions,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'updated',
      },
      sortBy,
      query: async args =>
        await this.databaseService.db.query.core_admin_permissions.findMany({
          ...args,
          with: {
            group: {
              columns: {
                id: true,
                color: true,
              },
            },
          },
        }),
    });

    const edges = await Promise.all(
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
            permissions: (edge.permissions ??
              []) as PermissionsStaffObjWithoutPluginName[],
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
          permissions: (edge.permissions ??
            []) as PermissionsStaffObjWithoutPluginName[],
        };
      }),
    );

    return {
      ...pagination,
      edges,
      permissions: await this.permissionsService.getPermissions(),
    };
  }
}
