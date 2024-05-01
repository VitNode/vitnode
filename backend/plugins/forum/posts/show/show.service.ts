import { Injectable } from "@nestjs/common";
import { and, asc, count, desc, eq, sql, ne } from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";

import {
  ShowPostsForumsArgs,
  ShowPostsForumsSortingEnum
} from "./dto/show.args";
import { ShowPostsForumsObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";
import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";
import { NotFoundError } from "@/utils/errors/not-found-error";
import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { forum_topics_logs } from "../../admin/database/schema/topics";

@Injectable()
export class ShowPostsForumsService {
  constructor(private databaseService: DatabaseService) {}

  protected async getData({
    first_post_id,
    limit,
    offset,
    orderBy = SortDirectionEnum.asc,
    topic_id
  }: {
    first_post_id: number;
    limit: number;
    topic_id: number;
    offset?: number;
    orderBy?: SortDirectionEnum;
  }) {
    const data = await unionAll(
      this.databaseService.db
        .select({
          topic_id: forum_posts.topic_id,
          log_action: sql`null`,
          user_id: forum_posts.user_id,
          post_id: forum_posts.id,
          log_id: sql`null`,
          created: forum_posts.created
        })
        .from(forum_posts)
        .where(
          and(
            eq(forum_posts.topic_id, topic_id),
            ne(forum_posts.id, first_post_id)
          )
        ),
      this.databaseService.db
        .select({
          topic_id: forum_topics_logs.topic_id,
          log_action: forum_topics_logs.action,
          user_id: forum_topics_logs.user_id,
          post_id: sql<number>`null`,
          log_id: forum_topics_logs.id,
          created: forum_topics_logs.created
        })
        .from(forum_topics_logs)
        .where(eq(forum_topics_logs.topic_id, topic_id))
    )
      .orderBy(
        orderBy === SortDirectionEnum.asc
          ? (asc(forum_posts.created), asc(forum_topics_logs.created))
          : (desc(forum_posts.created), desc(forum_topics_logs.created))
      )
      .limit(limit)
      .offset(offset);

    return await Promise.all(
      data.map(async edge => {
        const user = await this.databaseService.db.query.core_users.findFirst({
          where: (table, { eq }) => eq(table.id, edge.user_id),
          with: {
            avatar: true,
            group: {
              with: {
                name: true
              }
            }
          }
        });

        if (edge.log_id) {
          return {
            action_id: edge.log_id as number,
            action: edge.log_action as string,
            created: edge.created,
            user
          };
        }

        const content =
          await this.databaseService.db.query.forum_posts_content.findMany({
            where: (table, { eq }) => eq(table.item_id, edge.post_id)
          });

        return {
          action_id: null,
          action: null,
          post_id: edge.post_id as number,
          created: edge.created,
          content,
          user
        };
      })
    );
  }

  async show(
    { limit, page = 1, sortBy, topic_id }: ShowPostsForumsArgs,
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
        },
        posts: {
          orderBy: (table, { asc }) => asc(table.created),
          limit: 1
        }
      }
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    if (!topic.forum.can_all_read && !topic.forum.permissions.length) {
      throw new AccessDeniedError();
    }

    const getCount = await unionAll(
      this.databaseService.db
        .select({ count: count() })
        .from(forum_posts)
        .where(
          and(
            eq(forum_posts.topic_id, topic_id),
            ne(forum_posts.id, topic.posts[0].id)
          )
        ),
      this.databaseService.db
        .select({ count: count() })
        .from(forum_topics_logs)
        .where(eq(forum_topics_logs.topic_id, topic_id))
    );

    const totalCount = getCount.reduce((acc, item) => acc + item.count, 0);

    const edges = await this.getData({
      topic_id,
      limit,
      first_post_id: topic.posts[0].id,
      offset: (page - 1) * limit,
      orderBy:
        sortBy === ShowPostsForumsSortingEnum.oldest
          ? SortDirectionEnum.asc
          : SortDirectionEnum.desc
    });
    const lastEdges =
      totalCount > limit && page === 1
        ? (
            await this.getData({
              topic_id,
              limit,
              orderBy:
                sortBy === ShowPostsForumsSortingEnum.oldest
                  ? SortDirectionEnum.desc
                  : SortDirectionEnum.asc,
              first_post_id: topic.posts[0].id
            })
          )
            .reverse()
            .splice(-(totalCount - limit))
        : [];

    return {
      edges,
      lastEdges,
      pageInfo: {
        totalCount,
        totalPostsCount: getCount[0].count,
        limit,
        hasNextPage: limit === 0 ? false : totalCount > limit * page
      }
    };
  }
}
