import { Injectable } from '@nestjs/common';

import { currentDate } from '@/functions/date';
import { CreatePostsForumsArgs } from '@/src/forum/posts/create/dto/create.args';
import { ShowPostsForums } from '@/src/forum/posts/show/dto/show.obj';
import { Ctx } from '@/types/context.type';
import { User } from '@/utils/decorators/user.decorator';
import { DatabaseService } from '@/database/database.service';
import {
  forum_posts,
  forum_posts_content,
  forum_posts_timeline
} from '@/src/admin/forum/database/schema/posts';

@Injectable()
export class CreateForumsPostsService {
  constructor(private databaseService: DatabaseService) {}

  async create(
    { id }: User,
    { content, topic_id }: CreatePostsForumsArgs,
    { req }: Ctx
  ): Promise<ShowPostsForums> {
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

    // Add post to timeline
    await this.databaseService.db.insert(forum_posts_timeline).values({
      created: currentDate(),
      post_id: post.id,
      topic_id: id
    });

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

    return data;
  }
}
