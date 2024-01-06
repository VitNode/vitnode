import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowAdminStaffAdministratorsArgs } from './dto/show.args';
import { ShowAdminStaffAdministratorsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_admin_permissions } from '@/src/core/database/schema/admins';

@Injectable()
export class ShowAdminStaffAdministratorsService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    sortBy
  }: ShowAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministratorsObj> {
    const edges = await this.databaseService.db.query.core_admin_permissions.findMany({
      ...inputPagination({
        cursor,
        first,
        last
      }),
      orderBy: (table, { asc }) => [asc(table.updated)],
      with: {
        group: {
          with: {
            name: true
          }
        },
        user: {
          with: {
            avatar: true,
            group: {
              with: {
                name: true
              }
            }
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_admin_permissions);

    return outputPagination({
      edges: edges.map(edge => {
        if (edge.user) {
          return {
            ...edge,
            user_or_group: {
              ...edge.user
            }
          };
        }

        return {
          ...edge,
          user_or_group: {
            ...edge.group,
            group_name: edge.group.name
          }
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
