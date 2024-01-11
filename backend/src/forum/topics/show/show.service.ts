import { Injectable } from '@nestjs/common';
import { and, count, eq, or } from 'drizzle-orm';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { User } from '@/utils/decorators/user.decorator';
import { DatabaseService } from '@/database/database.service';
import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { forum_topics } from '@/src/admin/forum/database/schema/topics';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, forum_id, id, last }: ShowTopicsForumsArgs,
    user?: User
  ): Promise<ShowTopicsForumsObj> {
    // TODO: Fix permissions
    // const where = and(
    //   eq(forum_forums.id, forum_id),
    //   eq(forum_topics.id, id),
    //   or(
    //     eq(forum_forums.can_all_read, true),
    //     and(
    //       eq(forum_forums_permissions.group_id, user?.group.id),
    //       eq(forum_forums_permissions.can_read, true)
    //     )
    //   )
    // );

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_topics,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: forum_topics.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'created'
      }
    });

    const where = or(
      forum_id ? eq(forum_topics.forum_id, forum_id) : undefined,
      id ? eq(forum_topics.id, id) : undefined
    );

    const edges = await this.databaseService.db.query.forum_topics.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        forum: {
          with: {
            name: true
          }
        },
        title: true,
        posts: {
          with: {
            content: true,
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
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(forum_topics)
      .where(where);

    return outputPagination({
      edges: edges
        .map(edge => {
          const post = edge.posts.at(0);
          if (!post) return null;

          return { ...edge, user: post.user, content: post.content };
        })
        .filter(edge => edge !== null),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
