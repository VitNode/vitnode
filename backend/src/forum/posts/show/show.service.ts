import { Injectable } from '@nestjs/common';
import { and, count, eq } from 'drizzle-orm';

import { ShowPostsForumsArgs, ShowPostsForumsSortingEnum } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { DatabaseService } from '@/database/database.service';
import { forum_posts_timeline } from '@/src/admin/forum/database/schema/posts';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { NotFoundError } from '@/utils/errors/not-found-error';
import { User } from '@/utils/decorators/user.decorator';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';

@Injectable()
export class ShowPostsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, last, sortBy, topic_id }: ShowPostsForumsArgs,
    user: User | null
  ): Promise<ShowPostsForumsObj> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, topic_id),
      with: {
        forum: {
          with: {
            permissions: {
              where: (table, { eq }) => eq(table.group_id, user?.group.id ?? 1) // 1 = guest
            }
          }
        }
      }
    });

    if (!topic) {
      throw new NotFoundError('Topic');
    }

    if (!topic.forum.can_all_read && !topic.forum.permissions.length) {
      throw new AccessDeniedError();
    }

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_posts_timeline,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: forum_posts_timeline.id },
      defaultSortBy: {
        direction:
          sortBy === ShowPostsForumsSortingEnum.newest
            ? SortDirectionEnum.desc
            : SortDirectionEnum.asc,
        column: 'created'
      }
    });

    const where = eq(forum_posts_timeline.topic_id, topic_id);

    const edges = await this.databaseService.db.query.forum_posts_timeline.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        post: {
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
        },
        topic_log: {
          with: {
            topic: {
              with: {
                title: true
              }
            },
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
      .from(forum_posts_timeline)
      .where(where);

    return outputPagination({
      edges: edges.map(edge => {
        if (edge.topic_log) {
          return {
            ...edge,
            ...edge.topic_log
          };
        }

        return {
          ...edge,
          ...edge.post
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
