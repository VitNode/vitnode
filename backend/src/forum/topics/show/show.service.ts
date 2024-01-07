import { Injectable } from '@nestjs/common';
import { and, count, eq, or } from 'drizzle-orm';

import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

import { SortDirectionEnum } from '@/types/database/sortDirection.type';
import { User } from '@/utils/decorators/user.decorator';
import { DatabaseService } from '@/database/database.service';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { forum_topics } from '@/src/admin/forum/database/schema/topics';
import { forum_forums, forum_forums_permissions } from '@/src/admin/forum/database/schema/forums';

@Injectable()
export class ShowTopicsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, forum_id, id, last }: ShowTopicsForumsArgs,
    user?: User
  ): Promise<ShowTopicsForumsObj> {
    const where = and(
      eq(forum_forums.id, forum_id),
      eq(forum_topics.id, id),
      or(
        eq(forum_forums.can_all_read, true),
        and(
          eq(forum_forums_permissions.group_id, user?.group.id),
          eq(forum_forums_permissions.can_read, true)
        )
      )
    );

    const edges = await this.databaseService.db.query.forum_topics.findMany({
      ...inputPagination({
        cursor,
        first,
        last,
        where
      }),
      orderBy: (table, { asc }) => [asc(table.created)],
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

    // const [edges, totalCount] = await this.prisma.$transaction([
    //   this.prisma.forum_topics.findMany({
    //     ...inputPagination({ first, cursor, last }),
    //     where,
    //     include: {
    //       title: true,
    //       forum: {
    //         include: {
    //           name: true
    //         }
    //       },
    //       posts: {
    //         take: 1,
    //         orderBy: [
    //           {
    //             created: SortDirectionEnum.asc
    //           }
    //         ],
    //         include: {
    //           content: true,
    //           author: {
    //             include: {
    //               avatar: true,
    //               group: {
    //                 include: {
    //                   name: true
    //                 }
    //               }
    //             }
    //           }
    //         }
    //       }
    //     },
    //     orderBy: [
    //       {
    //         created: SortDirectionEnum.desc
    //       }
    //     ]
    //   }),
    //   this.prisma.forum_topics.count({ where })
    // ]);

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
