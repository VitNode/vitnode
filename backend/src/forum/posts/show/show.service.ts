import { Injectable } from '@nestjs/common';
import { count, eq, or } from 'drizzle-orm';

import { ShowPostsForumsArgs } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { inputPaginationCursor, outputPagination } from '@/functions/database/pagination';
import { DatabaseService } from '@/database/database.service';
import { forum_posts, forum_posts_timeline } from '@/src/admin/forum/database/schema/posts';
import { forum_topics_logs } from '@/src/admin/forum/database/schema/topics';
import { SortDirectionEnum } from '@/types/database/sortDirection.type';

@Injectable()
export class ShowPostsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last, topic_id }: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    // TODO: Check permissions if user can view this topic

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_posts_timeline,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: forum_posts_timeline.id },
      defaultSortBy: {
        direction: SortDirectionEnum.asc,
        column: 'created'
      }
    });

    const edges = await this.databaseService.db.query.forum_posts_timeline.findMany({
      ...pagination,
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
      .from(forum_posts_timeline);

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
