import { Injectable } from "@nestjs/common";
import { SQL, count, eq, inArray, or } from "drizzle-orm";

import { forum_posts } from "@/plugins/forum/admin/database/schema/posts";
import { User } from "@/utils/decorators/user.decorator";
import { forum_forums } from "@/plugins/forum/admin/database/schema/forums";
import { DatabaseService } from "@/database/database.service";
import { TextLanguage } from "@/utils/types/database/text-language.type";

@Injectable()
export class StatsShowForumForumsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async whereAccessToRead({
    isAdmin,
    user
  }: {
    user: User | null;
    isAdmin?: boolean;
  }): Promise<SQL<unknown>> {
    if (isAdmin) return undefined;

    const forumIds =
      await this.databaseService.db.query.forum_forums_permissions.findMany({
        columns: {
          forum_id: true
        },
        where: (table, { and, eq }) =>
          and(
            eq(table.group_id, user?.group.id ?? 1), // 1 - guest group id
            eq(table.can_read, true)
          )
      });

    const forumIdsSQL =
      forumIds.length > 0
        ? inArray(
            forum_forums.id,
            forumIds.map(({ forum_id }) => forum_id)
          )
        : undefined;

    return or(eq(forum_forums.can_all_read, true), forumIdsSQL);
  }

  protected async getAllChildren({
    forumId,
    user
  }: {
    forumId: number;
    user: User | null;
  }): Promise<
    {
      id: number;
      name: TextLanguage[];
    }[]
  > {
    let children: { id: number; name: TextLanguage[] }[] = [];
    const whereAccess = await this.whereAccessToRead({ user });

    const directChildren =
      await this.databaseService.db.query.forum_forums.findMany({
        where: (table, { and, eq }) =>
          and(eq(table.parent_id, forumId), whereAccess),
        with: {
          name: true
        }
      });

    for (const child of directChildren) {
      children.push({
        id: child.id,
        name: child.name
      });

      const grandChildren = await this.getAllChildren({
        forumId: child.id,
        user
      });
      children = children.concat(grandChildren);
    }

    return children;
  }

  protected async getTotalTopics({
    forumIds
  }: {
    forumIds: number[];
  }): Promise<{
    ids: number[];
    totalCount: number;
  }> {
    const topics =
      forumIds.length > 0
        ? await this.databaseService.db.query.forum_topics.findMany({
            where: (table, { inArray }) => inArray(table.forum_id, forumIds),
            columns: {
              id: true
            }
          })
        : [];

    return {
      totalCount: topics.length,
      ids: topics.map(topic => topic.id)
    };
  }

  protected async getTotalCountPosts({
    topicIds
  }: {
    topicIds: number[];
  }): Promise<number> {
    const posts =
      topicIds.length > 0
        ? await this.databaseService.db
            .select({ count: count() })
            .from(forum_posts)
            .where(inArray(forum_posts.topic_id, topicIds))
        : [
            {
              count: 0
            }
          ];

    return posts[0].count;
  }

  protected async getCountTopics({ forumId }: { forumId: number }): Promise<{
    count: number;
    ids: number[];
  }> {
    const topics = await this.databaseService.db.query.forum_topics.findMany({
      where: (table, { eq }) => eq(table.forum_id, forumId),
      columns: {
        id: true
      }
    });

    return {
      count: topics.length,
      ids: topics.map(topic => topic.id)
    };
  }

  protected async getCountPosts({
    topicIds
  }: {
    topicIds: number[];
  }): Promise<number> {
    const posts =
      topicIds.length > 0
        ? await this.databaseService.db
            .select({
              count: count()
            })
            .from(forum_posts)
            .where(inArray(forum_posts.topic_id, topicIds))
        : [
            {
              count: 0
            }
          ];

    return posts[0].count;
  }

  async topicsPosts({
    forumId,
    user
  }: {
    forumId: number;
    user: User | null;
  }): Promise<{
    children: {
      id: number;
      name: TextLanguage[];
    }[];
    stats: {
      posts: number;
      topics: number;
      total_posts: number;
      total_topics: number;
    };
    topic_ids: number[];
  }> {
    const whereAccess = await this.whereAccessToRead({ user });
    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { and, eq }) => and(eq(table.id, forumId), whereAccess)
    });

    const children = await this.getAllChildren({ forumId, user });
    const childrenIds = children.map(child => child.id);
    const totalTopics = await this.getTotalTopics({
      forumIds: forum ? [forum.id, ...childrenIds] : childrenIds
    });
    const totalPosts = await this.getTotalCountPosts({
      topicIds: totalTopics.ids
    });

    const topics = await this.getCountTopics({ forumId });
    const posts = await this.getCountPosts({ topicIds: topics.ids });

    return {
      children,
      stats: {
        total_posts: totalPosts - totalTopics.totalCount,
        total_topics: totalTopics.totalCount,
        topics: topics.count,
        posts: posts - topics.count
      },
      topic_ids: totalTopics.ids
    };
  }

  async breadcrumbs({ forumId }: { forumId: number }): Promise<
    {
      id: number;
      name: TextLanguage[];
    }[]
  > {
    let breadcrumbs: {
      id: number;
      name: TextLanguage[];
    }[] = [];

    const forum = await this.databaseService.db.query.forum_forums.findFirst({
      where: (table, { eq }) => eq(table.id, forumId),
      columns: {
        id: true,
        parent_id: true
      },
      with: {
        name: true
      }
    });

    if (forum) {
      breadcrumbs.push({
        id: forum.id,
        name: forum.name
      });

      const parent = await this.breadcrumbs({ forumId: forum.parent_id });
      breadcrumbs = [...parent, ...breadcrumbs];
    }

    return breadcrumbs;
  }
}
