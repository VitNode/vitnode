import { core_users } from '@/database/schema/users';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { and, eq, ilike, inArray, or, SQL } from 'drizzle-orm';

import { ShowAdminMembersArgs, ShowAdminMembersObj } from './show.dto';

@Injectable()
export class ShowAdminMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    groups,
    last,
    search,
    sortBy,
    id,
  }: ShowAdminMembersArgs): Promise<ShowAdminMembersObj> {
    let where: SQL | undefined;

    if (id) {
      where = eq(core_users.id, id);
    } else {
      if (search) {
        where = or(
          ilike(core_users.name, `%${search}%`),
          ilike(core_users.email, `%${search}%`),
          Number(search) ? eq(core_users.id, Number(search)) : undefined,
        );
      }

      if (groups && groups.length > 0) {
        where = and(where, inArray(core_users.group_id, groups));
      }
    }

    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_users,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'joined',
      },
      sortBy,
      where,
      query: async args =>
        await this.databaseService.db.query.core_users.findMany({
          ...args,
          columns: {
            email: true,
            id: true,
            newsletter: true,
            joined: true,
            email_verified: true,
          },
        }),
    });

    return {
      ...pagination,
      edges: await Promise.all(
        pagination.edges.map(async edge => {
          const user = await getUser({
            id: edge.id,
            db: this.databaseService.db,
          });

          return {
            ...user,
            ...edge,
          };
        }),
      ),
    };
  }
}
