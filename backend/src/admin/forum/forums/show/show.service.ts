import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowForumForumsAdminObj } from './dto/show.obj';

import { ShowForumForumsArgs } from '../../../../forum/forums/show/dto/show.args';
import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { forum_forums } from '@/src/admin/forum/database/schema/forums';

@Injectable()
export class ShowForumForumsAdminService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    parent_id
  }: ShowForumForumsArgs): Promise<ShowForumForumsAdminObj> {
    const where = eq(forum_forums.parent_id, parent_id);

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...inputPagination({
        cursor,
        first,
        last,
        where
      }),
      orderBy: (table, { asc }) => [asc(table.position)],
      with: {
        name: true,
        description: true,
        parent: {
          with: {
            name: true,
            description: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_forums)
      .where(where);

    const edges = await Promise.all(
      forums.map(async forum => {
        const childrenCount = await this.databaseService.db
          .select({ count: count() })
          .from(forum_forums)
          .where(eq(forum_forums.parent_id, forum.id));

        return {
          ...forum,
          parent: { ...forum.parent, _count: { children: 0 } },
          children: [],
          _count: { children: childrenCount[0].count }
        };
      })
    );

    return outputPagination({
      edges,
      totalCount,
      first,
      cursor,
      last
    });
  }
}
