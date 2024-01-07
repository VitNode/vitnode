import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { ShowCoreMembersObj } from './dto/show.obj';
import { ShowCoreMembersArgs } from './dto/show.args';

import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_users } from '@/src/admin/core/database/schema/users';

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

    const edges = await this.databaseService.db.query.core_users.findMany({
      ...inputPagination({
        cursor,
        first,
        last
      }),
      orderBy: (table, { asc }) => [asc(table.joined)],
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
