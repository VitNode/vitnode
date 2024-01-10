import { Injectable } from '@nestjs/common';
import { count, eq } from 'drizzle-orm';

import { ShowForumForumsAdminObj } from './dto/show.obj';

import { ShowForumForumsArgs } from '../../../../forum/forums/show/dto/show.args';
import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { forum_forums } from '@/src/admin/forum/database/schema/forums';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowForumForumsAdminService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    parent_id
  }: ShowForumForumsArgs): Promise<ShowForumForumsAdminObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_forums,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: forum_forums.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'position'
      }
    });

    const where = eq(forum_forums.parent_id, parent_id);

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...pagination,
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
