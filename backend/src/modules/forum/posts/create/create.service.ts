import { Injectable } from "@nestjs/common";

import { currentDate } from "@/src/functions/date";
import { CreatePostsForumsArgs } from "@/src/modules/forum/posts/create/dto/create.args";
import { ShowPostsForums } from "@/src/modules/forum/posts/show/dto/show.obj";
import { Ctx } from "@/src/types/context.type";
import { User } from "@/src/utils/decorators/user.decorator";
import { DatabaseService } from "@/src/database/database.service";
import {
  forum_posts,
  forum_posts_content,
  forum_posts_timeline
} from "@/src/modules/admin/forum/database/schema/posts";
import { NotFoundError } from "@/src/utils/errors/not-found-error";

@Injectable()
export class CreateForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    { id }: User,
    { content, topic_id }: CreatePostsForumsArgs,
    { req }: Ctx,
    skipTimeLine = false
  ): Promise<ShowPostsForums> {
    const topic = await this.databaseService.db.query.forum_topics.findFirst({
      where: (table, { eq }) => eq(table.id, topic_id)
    });

    if (!topic) {
      throw new NotFoundError("Topic");
    }

    const createPost = await this.databaseService.db
      .insert(forum_posts)
      .values({
        ip_address: req.ip,
        created: currentDate(),
        updated: currentDate(),
        topic_id,
        user_id: id
      })
      .returning();

    const post = createPost[0];

    // Post content
    await this.databaseService.db.insert(forum_posts_content).values(
      content.map(item => ({
        ...item,
        post_id: post.id
      }))
    );

    const data = await this.databaseService.db.query.forum_posts.findFirst({
      where: (table, { eq }) => eq(table.id, post.id),
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
    });

    // Add post to timeline
    if (!skipTimeLine) {
      const timelineItem = await this.databaseService.db
        .insert(forum_posts_timeline)
        .values({
          created: currentDate(),
          post_id: post.id,
          topic_id
        })
        .returning();

      const { id } = timelineItem[0];

      return {
        post_id: data.id,
        ...data,
        id
      };
    }

    return {
      post_id: post.id,
      ...data
    };
  }
}
