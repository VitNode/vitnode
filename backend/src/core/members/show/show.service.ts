import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowCoreMembersObj } from './dto/show.obj';
import { ShowCoreMembersArgs } from './dto/show.args';

import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { core_users } from '@/src/admin/core/database/schema/users';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowCoreMembersService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    findByIds,
    first,
    last,
    search,
    sortBy
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
      primaryCursor: { order: 'ASC', key: 'id', schema: core_users.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'joined'
      },
      sortBy
    });

    const edges = await this.databaseService.db.query.core_users.findMany({
      ...pagination,
      with: {
        avatar: true,
        group: {
          with: {
            name: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_users);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
