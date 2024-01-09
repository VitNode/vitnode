import { Injectable } from '@nestjs/common';
import { count, eq, or } from 'drizzle-orm';

import { ShowPostsForumsArgs } from './dto/show.args';
import { ShowPostsForumsObj } from './dto/show.obj';

import { outputPagination } from '@/functions/database/pagination';
import { DatabaseService } from '@/database/database.service';
import { forum_posts, forum_posts_timeline } from '@/src/admin/forum/database/schema/posts';
import { forum_topics_logs } from '@/src/admin/forum/database/schema/topics';

@Injectable()
export class ShowPostsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show({ cursor, first, last, topic_id }: ShowPostsForumsArgs): Promise<ShowPostsForumsObj> {
    // TODO: Check permissions if user can view this topic

    const edges = await this.databaseService.db.query.forum_posts_timeline.findMany({
      // ...inputPagination({
      //   cursor,
      //   first,
      //   last,
      //   where: or(eq(forum_posts.topic_id, topic_id), eq(forum_topics_logs.topic_id, topic_id))
      // }),
      orderBy: (table, { asc }) => [asc(table.created)],
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
