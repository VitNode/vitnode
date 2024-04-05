import {
  Field,
  Int,
  ObjectType,
  Query,
  Resolver,
  createUnionType
} from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { asc, eq, sql } from "drizzle-orm";
import { unionAll } from "drizzle-orm/pg-core";

import { TopicActions } from "../show/dto/show.obj";

import { AuthGuards, OptionalAuth } from "@/utils/guards/auth.guard";
import { DatabaseService } from "@/plugins/database/database.service";
import { forum_posts } from "../../admin/database/schema/posts";
import { forum_topics_logs } from "../../admin/database/schema/topics";
import { User } from "@/utils/decorators/user.decorator";
import { TextLanguage } from "@/types/database/text-language.type";

@ObjectType()
export class ShowPostsForumsMetaTagsTest {
  @Field(() => Int)
  action_id: number;

  @Field(() => TopicActions)
  action: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class ShowPostsForumsTest {
  @Field(() => Int)
  post_id: number;

  @Field(() => [TextLanguage])
  content: TextLanguage[];

  @Field(() => User)
  user: User;
}

export const PostsWithMetaTagsUniontest = createUnionType({
  name: "postsWithMetaTagsUniontest",
  types: () => [ShowPostsForumsTest, ShowPostsForumsMetaTagsTest] as const,
  resolveType(value) {
    if (value.action) {
      return ShowPostsForumsMetaTagsTest;
    }

    if (value.content) {
      return ShowPostsForumsTest;
    }

    return null;
  }
});

@ObjectType()
export class ShowPostsForumsTestObj {
  @Field(() => [PostsWithMetaTagsUniontest])
  edges: (ShowPostsForumsTest | ShowPostsForumsMetaTagsTest)[];
}

@Resolver()
export class ShowPostsTestForumsResolver {
  constructor(private databaseService: DatabaseService) {}

  @Query(() => ShowPostsForumsTestObj)
  @OptionalAuth()
  @UseGuards(AuthGuards)
  async aaaaa_forum_posts__test(): Promise<ShowPostsForumsTestObj> {
    const topic_id = 1;

    // ref: https://github.com/drizzle-team/drizzle-orm/issues/2050
    const edges = await unionAll(
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
        .where(eq(forum_posts.topic_id, topic_id)),

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
    ).orderBy(asc(forum_posts.created), asc(forum_topics_logs.created));

    const test1 = await Promise.all(
      edges.map(async edge => {
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
            where: (table, { eq }) => eq(table.post_id, edge.post_id)
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

    return {
      edges: test1
    };
  }
}
