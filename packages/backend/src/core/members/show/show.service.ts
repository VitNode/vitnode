import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { and, count, eq, ilike, or } from 'drizzle-orm';

import { core_users } from '../../../database/schema/users';
import { inputPaginationCursor, outputPagination } from '../../../functions';
import { SortDirectionEnum } from '../../../utils';
import { ShowCoreMembersArgs, ShowCoreMembersObj } from './show.dto';

@Injectable()
export class ShowCoreMembersService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    last,
    name_seo,
    search,
    sortBy,
  }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    // TODO: Add search
    // const where: Prisma.core_membersWhereInput = findByIds
    //   ? { id: { in: findByIds, mode: 'insensitive' } }
    //   : {
    //       OR: [
    //         {
    //           name: {
    //             contains: search ?? ''
    //           }
    //         }
    //       ]
    //     };

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

    const where = or(
      name_seo ? eq(core_users.name_seo, name_seo) : undefined,
      or(
        ilike(core_users.name, `%${search}%`),
        ilike(core_users.email, `%${search}%`),
        Number(search) ? eq(core_users.id, Number(search)) : undefined,
      ),
    );

    const edgesInit = await this.databaseService.db.query.core_users.findMany({
      ...pagination,
      columns: {
        id: true,
        joined: true,
      },
      where: and(pagination.where, where),
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(where);

    const edges = await Promise.all(
      edgesInit.map(async edge => {
        const user = await getUser({
          id: edge.id,
          db: this.databaseService.db,
        });

        return {
          ...edge,
          ...user,
        };
      }),
    );

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
