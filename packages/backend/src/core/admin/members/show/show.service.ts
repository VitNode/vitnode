import { core_users } from '@/database/schema/users';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { and, count, eq, ilike, inArray, or } from 'drizzle-orm';

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
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_users,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_users.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'joined',
      },
      sortBy,
    });

    const where = id
      ? eq(core_users.id, id)
      : and(
          search
            ? or(
                ilike(core_users.name, `%${search}%`),
                ilike(core_users.email, `%${search}%`),
                Number(search) ? eq(core_users.id, Number(search)) : undefined,
              )
            : undefined,
          groups && groups.length > 0
            ? inArray(core_users.group_id, groups)
            : undefined,
        );

    const edgesFromDb = await this.databaseService.db.query.core_users.findMany(
      {
        ...pagination,
        where: and(pagination.where, where),
        columns: {
          email: true,
          id: true,
          newsletter: true,
          joined: true,
          email_verified: true,
        },
      },
    );

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(where);

    const edges = await Promise.all(
      edgesFromDb.map(async edge => {
        const user = await getUser({
          id: edge.id,
          db: this.databaseService.db,
        });

        return {
          ...user,
          ...edge,
        };
      }),
    );

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
