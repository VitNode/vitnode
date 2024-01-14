import { Injectable } from '@nestjs/common';
import { and, count, eq, isNull } from 'drizzle-orm';

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

    const where = !parent_id
      ? isNull(forum_forums.parent_id)
      : eq(forum_forums.parent_id, parent_id);

    const forums = await this.databaseService.db.query.forum_forums.findMany({
      ...pagination,
      where: and(pagination.where, where),
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
        const children = await this.databaseService.db.query.forum_forums.findMany({
          where: eq(forum_forums.parent_id, forum.id),
          orderBy: (table, { asc }) => [asc(table.position)],
          with: {
            name: true,
            description: true,
            permissions: true
          }
        });

        return {
          ...forum,
          parent: forum.parent_id ? { ...forum.parent, _count: { children: 0 } } : null,
          _count: { children: children.length },
          children: await Promise.all(
            children.map(async child => {
              const children = await this.databaseService.db.query.forum_forums.findMany({
                where: eq(forum_forums.parent_id, child.id),
                orderBy: (table, { asc }) => [asc(table.position)],
                with: {
                  name: true,
                  description: true,
                  permissions: true
                }
              });

              return {
                ...child,
                children,
                _count: { children: children.length }
              };
            })
          )
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
