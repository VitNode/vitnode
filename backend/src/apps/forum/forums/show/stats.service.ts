import { Injectable } from "@nestjs/common";
import { count, inArray } from "drizzle-orm";

import { forum_posts } from "@/apps/admin/forum/database/schema/posts";
import { DatabaseService } from "@/database/database.service";
import { TextLanguage } from "@/types/database/text-language.type";

@Injectable()
export class StatsShowForumForumsService {
  constructor(private databaseService: DatabaseService) {}

  protected async getAllChildren({ forumId }: { forumId: number }): Promise<
    {
      id: number;
      name: TextLanguage[];
    }[]
  > {
    let children: { id: number; name: TextLanguage[] }[] = [];

    const directChildren =
      await this.databaseService.db.query.forum_forums.findMany({
        where: (table, { eq }) => eq(table.parent_id, forumId),
        columns: {
          id: true
        },
        with: {
          name: true
        }
      });

    for (const child of directChildren) {
      children.push({
        id: child.id,
        name: child.name
      });

      const grandChildren = await this.getAllChildren({ forumId: child.id });
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
        : [];

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
    const posts = await this.databaseService.db
      .select({
        count: count()
      })
      .from(forum_posts)
      .where(inArray(forum_posts.topic_id, topicIds));

    return posts[0].count;
  }

  async stats({ forumId }: { forumId: number }): Promise<{
    children: {
      id: number;
      name: TextLanguage[];
    }[];
    posts: number;
    topics: number;
    total_posts: number;
    total_topics: number;
  }> {
    const children = await this.getAllChildren({ forumId });
    const totalTopics = await this.getTotalTopics({
      forumIds: [forumId, ...children.map(child => child.id)]
    });
    const totalPosts = await this.getTotalCountPosts({
      topicIds: totalTopics.ids
    });

    const topics = await this.getCountTopics({ forumId });
    const posts = await this.getCountPosts({ topicIds: topics.ids });

    return {
      total_posts: totalPosts - totalTopics.totalCount,
      total_topics: totalTopics.totalCount,
      children,
      topics: topics.count,
      posts: posts - topics.count
    };
  }
}
