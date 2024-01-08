import { Injectable } from '@nestjs/common';
import { and, count, ilike, inArray, or } from 'drizzle-orm';

import { ShowAdminMembersObj } from './dto/show.obj';
import { ShowAdminMembersArgs } from './dto/show.args';

import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_users } from '@/src/admin/core/database/schema/users';

@Injectable()
export class ShowAdminMembersService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    groups,
    last,
    search,
    sortBy
  }: ShowAdminMembersArgs): Promise<ShowAdminMembersObj> {
    const where = and(
      or(
        ilike(core_users.name, `%${search}%`),
        ilike(core_users.email, `%${search}%`),
        ilike(core_users.id, `%${search}%`)
      ),
      groups && groups.length > 0 ? inArray(core_users.group_id, groups) : undefined
    );

    const edges = await this.databaseService.db.query.core_users.findMany({
      ...inputPagination({
        cursor,
        first,
        last,
        where
      }),
      orderBy: (table, { asc }) => [asc(table.joined)],
      columns: {
        password: false
      },
      with: {
        group: {
          with: {
            name: true
          }
        },
        avatar: true
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(where);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
