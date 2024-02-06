import { Injectable } from "@nestjs/common";
import { and, asc, count, eq, or } from "drizzle-orm";

import { ShowTopicsForumsArgs } from "./dto/show.args";
import { ShowTopicsForumsObj } from "./dto/show.obj";

import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { User } from "@/utils/decorators/user.decorator";
import { DatabaseService } from "@/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { forum_topics } from "@/src/admin/forum/database/schema/topics";
import { forum_posts } from "@/src/admin/forum/database/schema/posts";
import { CustomError } from "@/utils/errors/CustomError";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { forum_forums_permissions } from "@/src/admin/forum/database/schema/forums";

@Injectable()
export class ShowTopicsForumsService {
  constructor(private databaseService: DatabaseService) {}

  async show(
    { cursor, first, forum_id, id, last }: ShowTopicsForumsArgs,
    user: User | null
  ): Promise<ShowTopicsForumsObj> {
    if (!forum_id && !id) {
      throw new CustomError({
        code: "FORUM_TOPIC_SHOW_NO_ID",
        message: "No forum_id or id provided"
      });
    }

    const pagination = await inputPaginationCursor({
      cursor,
      database: forum_topics,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: forum_topics.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "created"
      }
    });

    const where = and(
      or(
        forum_id ? eq(forum_topics.forum_id, forum_id) : undefined,
        id ? eq(forum_topics.id, id) : undefined
      )
    );

    const edges = await this.databaseService.db.query.forum_topics.findMany({
      ...pagination,
      where: and(pagination.where, where),
      limit: id ? 1 : pagination.limit,
      with: {
        forum: {
          with: {
            name: true,
            permissions: {
              where: eq(forum_forums_permissions.group_id, user?.group.id ?? 1) // 1 = guest
            }
          }
        },
        title: true,
        posts: {
          orderBy: [asc(forum_posts.created)],
          limit: 1,
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
          // Check permissions
          if (!edge.forum.can_all_view && !edge.forum.permissions.length) {
            if (id && edges.length === 1) {
              throw new AccessDeniedError();
            }

            return null;
          }

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
