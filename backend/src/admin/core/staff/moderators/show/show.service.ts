import { Injectable } from '@nestjs/common';

import { ShowAdminStaffModeratorsArgs } from './dto/show.args';
import { ShowAdminStaffModeratorsObj } from './dto/show.obj';

import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_moderators_permissions } from '@/src/core/database/schema/moderators';
import { count } from 'drizzle-orm';

@Injectable()
export class ShowAdminStaffModeratorsService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    sortBy
  }: ShowAdminStaffModeratorsArgs): Promise<ShowAdminStaffModeratorsObj> {
    const edges = await this.databaseService.db.query.core_moderators_permissions.findMany({
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
      .from(core_moderators_permissions);

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
